const zoho = {
  createInvoice: async (item, position, esEnganche, select) => {
    try {
      const parsePos = Number(position)
      const parseSel = Number(select)
      const data = {
        item,
        position: parsePos,
        esEnganche,
        select: parseSel,
      }
      console.log(JSON.stringify(data))
      const comprobar = fetch(`/server/ecommerce/books/createFactura`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      return error
    }
  },
}

export default zoho
