/**
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

export const titleRules = [
  (value: string) => !!value || 'Обязательное поле',
  (value: string) => (value || '').length <= 50 || 'Максимум 50 символов'
]
