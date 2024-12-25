/**
 * Класс, описывающий структуру данных статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import type { UpdateRemoveInterface } from '@/shared/interface'
import type { ArticleType } from '@/shared/types'

class BlogClass implements UpdateRemoveInterface, ArticleType {
  constructor(
    readonly id: number = -1,
    public title: string = 'Sample',
    public text: string = 'Lorem	ipsum',
    public created_at?: string,
    public edited_at?: string
  ) {}

  update = async () => {
    return { id: this.id }
  }

  remove = async () => {
    return { id: this.id }
  }

  /**
   * Получение ключей для объекта
   */
  static getKeys(): (keyof ArticleType)[] {
    const keys = Object.keys(new BlogClass()).filter(
      (k) => k !== 'remove' && k !== 'update'
    ) as (keyof ArticleType)[]
    return keys
  }
}

export { BlogClass }
