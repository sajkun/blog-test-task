class BlogClass {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public created_at: string,
    public edited_at: string,
    public thumbnail?: string
  ) {}
}

export { BlogClass }
