/**
 * Класс, описывающий структуру данных статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import type { UpdateRemoveInterface } from '@/shared/interface'
import { type PostType } from '.'
import { usePostStorage } from '..'

let storage
class PostClass implements PostType, UpdateRemoveInterface {
  readonly id: number = -1
  public title: string = 'Sample'
  public text: string = 'Lorem	ipsum'
  public created_at?: string
  public edited_at?: string

  constructor(post: PostType) {
    const { id, title, text, created_at, edited_at } = post
    this.id = id
    this.title = title
    this.text = text
    this.created_at = created_at ?? '-'
    this.edited_at = edited_at ?? '-'
    storage = usePostStorage()
  }

  update = () => {
    storage!.updatePost(this)
  }

  remove = () => {
    storage!.removePost(this.id)
  }
}
export { PostClass }
