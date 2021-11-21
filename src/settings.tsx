export type T_lecture = {
  id: number,
  title: string,
  subtitle: string,
  date: string,
  motivators: number[],
  thumbs: string[],
  image: string | File,
};

export type T_motivator = {
  name_kor: string,
  name_eng: string,
  id: number,
  image: string | File,
  image_thumb: string,
  lectures: T_lecture[],
};

export const SETTINGS = {
	REST_URL: "http://52.79.124.70:7231",
}