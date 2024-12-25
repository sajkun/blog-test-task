/**
 * Класс, описывающий структуру данных статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

class BlogClass {
  constructor(
    readonly id: number,
    public title: string,
    public text: string,
    public created_at: string,
    public edited_at: string,
    public thumbnail?: string
  ) {}
}

export { BlogClass }
