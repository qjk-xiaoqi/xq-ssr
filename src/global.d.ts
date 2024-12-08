declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.ttf'
declare module '*.less'
declare module '*.css'
declare module 'isomorphic-style-loader/useStyles'
declare module 'isomorphic-style-loader/StyleContext'

interface Window {
  INITIAL_STATE: Record<string, any>
}
