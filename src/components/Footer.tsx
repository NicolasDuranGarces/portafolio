export function Footer() {
  return (
    <footer>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <small>© {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</small>
        <small>Hecho con React + Vite</small>
      </div>
    </footer>
  )
}

