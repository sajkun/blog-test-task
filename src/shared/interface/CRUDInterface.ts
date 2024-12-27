/**
 * Интерфейс на создание, редактирование и создание
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

type hasId = { id: number }

export interface CRUDInterface {
  update: () => void
  remove: () => void
  create: () => void
}
