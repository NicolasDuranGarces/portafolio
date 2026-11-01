/** First sentence of a paragraph, so each fact fits on a line or two. */
export function firstSentence(paragraph: string): string {
  const end = paragraph.indexOf('. ')
  return end < 0 ? paragraph : paragraph.slice(0, end + 1)
}
