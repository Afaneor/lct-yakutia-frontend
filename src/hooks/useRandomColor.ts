import { presetDarkPalettes } from '@ant-design/colors'
import { useMemo } from 'react'
import { IntRange } from 'src/types'
import shuffle from 'fast-shuffle'

export const useRandomColors = (randomSeed: number, level: IntRange<0, 9>) => {
  const shuffleFn = useMemo(() => shuffle(randomSeed), [randomSeed])

  const colors = useMemo(() => {
    return Object.values(presetDarkPalettes).map(
      (colorArray) => colorArray[level]
    )
  }, [level])

  return useMemo(() => shuffleFn(colors), [colors])
}
