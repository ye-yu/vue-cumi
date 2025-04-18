import { rgbToHex, type RGB } from "./color-space.util";
import { getDaysAfterRelease } from "./date.util";

export enum ShareType {
  sharer = 'sharer',
  clipboard = 'clipboard'
}

export function shareResult(shareData: {
  todaysChallenge: RGB,
  mixCount: number,
  similarity: string,
}): ShareType {
  const puzzleDays = getDaysAfterRelease();
  const toShare: ShareData = {}
  toShare.title = `CUMI | Today's challege ${rgbToHex(shareData.todaysChallenge)}`
  toShare.text = `CUMI #${puzzleDays} - My mixes are ${shareData.similarity}% match today!\n\nMy mixes: ${shareData.mixCount} count\n\n`
  toShare.url = `${window.location.href}`
  if (navigator?.canShare?.(toShare)) {
    navigator.share(toShare)
    return ShareType.sharer
  } else {
    navigator.clipboard.writeText([
      toShare.title,
      toShare.text,
      '',
      toShare.url
    ].join('\n'))
    alert('Copied to clipboard!')
    return ShareType.clipboard
  }
}
