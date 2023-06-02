import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import { CommandLineIcon, UserIcon } from '@heroicons/react/24/outline'

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
// const BalancerWrapper = (props: any) => <Balancer {...props} />

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div
    className="border-b border-black/10 bg-gray-50 text-gray-800"
  >
    <div
      className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl"
    >
      <div className="min-w-[30px]">
        <CommandLineIcon />
      </div>
      <span className="animate-pulse cursor-default mt-1">▍</span>
    </div>
  </div >
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ role = 'assistant', content, isStreaming }: ChatGPTMessage & { isStreaming: boolean }) {
  if (!content) {
    return null
  }
  const contentWithCursor = `${content}${isStreaming ? '▍' : ''}`
  const formatteMessage = convertNewLines(contentWithCursor)

  return (
    <div
      className={
        role === 'assistant'
          ? "border-b border-black/10 bg-gray-50 text-gray-800"
          : "border-b border-black/10 bg-white text-gray-800"
      }
    >
      <div
        className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl"
      >
        <div className="min-w-[30px]">
          {role === 'assistant'
            ? (
              <CommandLineIcon />
            )
            : (
              <UserIcon />
            )
          }
        </div>

        <div className="prose whitespace-pre-wrap flex-1">
          {formatteMessage}
        </div>
      </div>
    </div>
  )
}
