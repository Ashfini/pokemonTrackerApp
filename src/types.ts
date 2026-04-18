// The four views you can switch between. If you add a page, add its key here.
export type View = 'home' | 'list' | 'signin' | 'signup';

// TODO: Replace this with your own product type. Pick something you'd actually use
// (recipes, video games, movies, sneakers, albums...) and give it at least 5 real
// fields (not counting id, created_at, or user_id).
//
// Example:
//
// export interface Product {
//   id: number;
//   created_at: string;
//   user_id: string;
//   title: string;
//   platform: string;
//   genre: string;
//   release_year: number;
//   rating: number;
//   description: string;
// }

export interface Product {
  id: number;
  created_at: string;
  user_id: string;
  // TODO: add your 5+ fields here
}
