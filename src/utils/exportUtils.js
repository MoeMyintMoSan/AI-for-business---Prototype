export function exportCSV(filename, columns, rows) {
  const header = columns.join(',')
  const csvRows = rows.map((row) =>
    columns
      .map((col) => {
        const val = row[col] ?? ''
        const escaped = String(val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      .join(',')
  )
  const blob = new Blob([header + '\n' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function printSummary(title, lines) {
  const content = `${title}\n\n${lines.join('\n')}`
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`<pre>${content}</pre>`)
  win.document.close()
  win.focus()
  win.print()
  win.close()
}
