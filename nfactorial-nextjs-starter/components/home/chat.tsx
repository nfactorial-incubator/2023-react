'use client'

import { throttle } from '@/lib/throttle'
import { useState, useRef, useEffect, useCallback } from 'react'
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './chat-line'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content: 'Hi! I am a friendly AI assistant. Ask me anything!',
  },
]

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white mt-6 flex clear-both">
    <div className="mx-2 my-4 flex-1 md:mx-4 md:my-[52px] lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <div className="relative mx-2 flex flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
        <input
          aria-label="chat input"
          required
          className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-10 text-black"
          placeholder="Type a message..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(input)
              setInput('')
            }
          }}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <button
          className="absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900"
          type="submit"
          onClick={() => {
            sendMessage(input)
            setInput('')
          }}
        >
          <div className="w-6 h-6">
            <PaperAirplaneIcon />
          </div>
        </button>
      </div>
    </div>
  </div>
)

const useMessages = () => {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages)
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  // send message to API /api/chat endpoint
  const sendMessage = async (newMessage: string) => {
    setLoading(true)
    setError(null)
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage } as ChatGPTMessage,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      setError(response.statusText)
      setLoading(false)
      return
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    // This data is a ReadableStream

    setIsMessageStreaming(true)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as ChatGPTMessage,
      ])

      setLoading(false)
    }

    setIsMessageStreaming(false)
  }

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isMessageStreaming, loading, error, sendMessage } = useMessages()

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  return (
    <div className="flex-1 w-full border-zinc-100 bg-white overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden"
        onScroll={handleScroll}
      >
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming} />
        ))}

        {loading && <LoadingChatLine />}

        <div
          className="h-[152px] bg-white"
          ref={messagesEndRef}
        />
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
