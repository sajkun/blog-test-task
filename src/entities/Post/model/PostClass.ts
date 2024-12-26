/**
 * Класс, описывающий структуру данных статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import type { UpdateRemoveInterface } from '@/shared/interface'
import { type PostType } from '.'

class PostClass implements PostType, UpdateRemoveInterface {
  constructor(
    readonly id: number = -1,
    public title: string = 'Sample',
    public text: string = 'Lorem	ipsum',
    public created_at?: string,
    public edited_at?: string
  ) {}

  update = () => {}

  remove = () => {}

  /**
   * Получение ключей класса
   */
  static getKeys(): (keyof PostType)[] {
    const keys = Object.keys(new PostClass()).filter(
      (k) => k !== 'remove' && k !== 'update'
    ) as (keyof PostType)[]
    return keys
  }
}

export { PostClass }
