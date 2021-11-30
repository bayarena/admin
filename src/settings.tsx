export type T_lecture = {
  id: number,

  title: string,
  date: string,
  image: string | File,

  category: string,
  description: string,
  theme: string,
  time: number,
  difficulty: number,
  motivators: number[],

  thumbs: string[],
};

export type T_motivator = {
  name_kor: string,
  name_eng: string,
  description: string,
  id: number,
  image: string | File,
  image_thumb: string,
  lectures: T_lecture[],
};

export const SETTINGS = {
	REST_URL: "http://52.79.124.70:7231",
}