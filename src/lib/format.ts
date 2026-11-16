const priceFmt = new Intl.NumberFormat('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const intFmt = new Intl.NumberFormat('da-DK', { maximumFractionDigits: 0 })

export const formatPrice = (n: number) => `${priceFmt.format(n)} kr.`
export const formatInt = (n: number) => intFmt.format(n)
export const formatWeight = (g: number) => `${intFmt.format(g)}g`

export const formatRangeValue = (n: number, unit: string) =>
  unit === 'g' && n >= 1000 ? `${intFmt.format(n / 1000)} kg` : `${intFmt.format(n)} ${unit}`

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
