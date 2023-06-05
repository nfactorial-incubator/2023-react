import axios from 'axios'
import { NextResponse } from 'next/server'

/**
 * Retrieves a random Jeopardy question
 */
export async function GET() {
  const res = await axios.get('https://jservice.io/api/random', {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Expires': '0'
    }
  })

  const question_data = res.data?.[0]

  if (!question_data) {
    return NextResponse.json({
      message: 'No question was found in the response.'
    }, {
      status: 500
    })
  }

  return NextResponse.json({
    id: question_data.id,
    question: question_data.question,
    category: question_data.category?.title || '',
    answer: question_data.answer,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Expires': '0'
    }
  })
}