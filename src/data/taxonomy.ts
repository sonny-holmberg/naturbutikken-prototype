// Product browsing information architecture (from Product_browsing_information_architecture.png)

export type Subcategory = { id: string; label: string }
export type Group = { label: string; items: Subcategory[] }
export type Category = { id: string; label: string; groups: Group[] }

export const SECTION_LABEL = 'Kikkerter og teleskoper'

export const categories: Category[] = [
  {
    id: 'kikkerter',
    label: 'Kikkerter',
    groups: [
      {
        label: 'Type',
        items: [
          { id: 'fuglekikkerter', label: 'Fuglekikkerter' },
          { id: 'natsynskikkerter', label: 'Natsynskikkerter' },
          { id: 'monokikkerter', label: 'Monokikkerter' },
          { id: 'boernekikkerter', label: 'Børnekikkerter' },
          { id: 'termiske-spottere', label: 'Termiske spottere' },
        ],
      },
    ],
  },
  {
    id: 'teleskoper',
    label: 'Teleskoper',
    groups: [
      {
        label: 'Type',
        items: [
          { id: 'teleskoper', label: 'Teleskoper' },
          { id: 'udsigtskikkerter', label: 'Udsigtskikkerter' },
        ],
      },
      {
        label: 'Tilbehør til teleskoper',
        items: [
          { id: 'okularer', label: 'Okularer' },
          { id: 'filtre', label: 'Filtre' },
          { id: 'fotoadaptere', label: 'Fotoadaptere' },
        ],
      },
    ],
  },
  {
    id: 'mikroskoper-og-lupper',
    label: 'Mikroskoper og lupper',
    groups: [
      {
        label: 'Type',
        items: [
          { id: 'mikroskoper', label: 'Mikroskoper' },
          { id: 'lupper', label: 'Lupper' },
        ],
      },
    ],
  },
  {
    id: 'tilbehoer',
    label: 'Tilbehør',
    groups: [
      {
        label: 'Type',
        items: [
          { id: 'kikkerttasker-og-etuier', label: 'Kikkerttasker og etuier' },
          { id: 'remme', label: 'Remme' },
        ],
      },
      {
        label: 'Stativer',
        items: [
          { id: 'stativer', label: 'Stativer' },
          { id: 'stativhoveder', label: 'Stativhoveder' },
        ],
      },
      {
        label: 'Pleje',
        items: [{ id: 'rens-og-pleje', label: 'Rens og pleje' }],
      },
    ],
  },
]

/** subcategory id -> parent category id */
export const subToCategory: Record<string, string> = Object.fromEntries(
  categories.flatMap((c) => c.groups.flatMap((g) => g.items.map((s) => [s.id, c.id]))),
)

export const categoryById = (id?: string) => categories.find((c) => c.id === id)

export const subcategoryById = (id?: string) =>
  categories.flatMap((c) => c.groups.flatMap((g) => g.items)).find((s) => s.id === id)
