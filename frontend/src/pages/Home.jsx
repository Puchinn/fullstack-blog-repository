import { BlogList } from '../componentes/BlogList'
import { CreateBlog } from '../componentes/CreateBlog'

export function Home () {
  return (
    <>
      <CreateBlog />
      <BlogList />
    </>
  )
}
