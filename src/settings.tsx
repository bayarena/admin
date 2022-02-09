export type T_meta_motivator = {
  id: number,
  name_kor: string,
  image_thumb: string,
};

export type T_lecture = {
  id: number,

  ticket: string,
  meta_motivator: T_meta_motivator[],
  tag: string,
  title: string
  date: string,
  image: string | File,
  main_image: string | File,
  description: string,
  theme: string,
  time: number,
  difficulty: number,
  staging: number,
  category: number | undefined,
  motivators: number[],
};

export type T_motivator = {
  id: number,
  
  name_kor: string,
  name_eng: string,
  expertise: string,
  description: string,
  image: string | File,
  image_thumb: string,
  lectures: T_lecture[],
};

export type T_category = {
  id: number,

  title: string,
  thumb: string | File,
  lectures: T_lecture[],
}

export const SETTINGS = {
	REST_URL: "http://52.79.124.70:7231",
}