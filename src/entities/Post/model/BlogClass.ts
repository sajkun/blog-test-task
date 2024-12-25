/**
 * Класс, описывающий структуру данных статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import type { UpdateRemoveInterface } from '@/shared/interface'

class BlogClass implements UpdateRemoveInterface {
  constructor(
    readonly id: number = -1,
    public title: string = 'Sample',
    public text: string = 'Lorem	ipsum',
    public created_at?: string,
    public edited_at?: string,
    public thumbnail?: string
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
  static getKeys(): string[] {
    const keys: string[] = Object.keys(new BlogClass()).filter(
      (k) => k !== 'remove' && k !== 'update'
    )
    return keys
  }
}

export { BlogClass }
