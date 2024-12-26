/**
 * Интерфейс на создание, редактирование и создание
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

type hasId = { id: number }

export interface UpdateRemoveInterface {
  update: () => void
  remove: () => void
}
