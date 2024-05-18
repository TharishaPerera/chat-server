import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4">
        <Container>
            <h3><Link to="/" className="link-light text-decoration-none">N U T R I K I D S</Link></h3>
            <span className="text-light">Logged in as Tharisha</span>
            <Nav>
                <Stack direction="horizontal" gap={3}>
                    <Link to="/login" className="link-light text-decoration-none">Login</Link>
                    <Link to="/register" className="link-light text-decoration-none">Register</Link>
                </Stack>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar