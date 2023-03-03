const getOffset = (limit = 10, page = 1) => (page - 1) * limit

const getPagination = (limit = 10, page = 1, total = 50) => {
  const totalPage = Math.ceil(total / limit)
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
  const prev = !(currentPage - 1 < 1)
  const next = !(currentPage + 1 > totalPage)
  return {
    total_pages: totalPage,
    current_page: currentPage,
    has_pre: prev,
    has_next: next,
    category: null
  }
}

module.exports = {
  getOffset,
  getPagination
}
