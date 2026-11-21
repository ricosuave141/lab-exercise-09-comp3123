import { Component } from 'react'
import axios from 'axios'
import { Card, Button, Row, Col, Image, Spinner, Alert } from 'react-bootstrap'

class PersonList extends Component {
  state = {
    persons: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    axios
      .get(`https://randomuser.me/api/?results=10`)
      .then((res) => {
        console.log(res.data)
        const persons = res.data.results
        this.setState({ persons, loading: false })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ error: err.message, loading: false })
      })
  }

  render() {
    const { persons, loading, error } = this.state

    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="success" />
        </div>
      )
    }

    if (error) {
      return <Alert variant="danger" className="m-3">Error: {error}</Alert>
    }

    return (
      <div className="px-3">
        {persons.map((person) => {
          const { name, login, gender, location, email, dob, registered, phone, cell, picture } = person
          const details = [
            ['Gender', gender.toUpperCase()],
            ['Time Zone Description', location.timezone.description],
            [
              'Address',
              `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country} - ${location.postcode}`,
            ],
            ['Email', email],
            ['Birth Date and Age', `${dob.date} (${dob.age})`],
            ['Register Date', registered.date],
            ['Phone#', phone],
            ['Cell#', cell],
          ]

          return (
            <Card key={login.uuid} className="person-card my-3">
              <Card.Header>
                <strong>
                  {name.title} {name.first} {name.last} - {login.uuid}
                </strong>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={2} className="text-center">
                    <Image src={picture.large} roundedCircle className="person-img mb-3" alt={name.first} />
                    <div>
                      <Button variant="primary" size="sm">Details</Button>
                    </div>
                  </Col>
                  <Col md={10}>
                    <Row className="mb-3 align-items-center">
                      <Col sm={3} className="label">User Name:</Col>
                      <Col sm={9} className="fs-5">{login.username}</Col>
                    </Row>
                    {details.map(([label, value]) => (
                      <Row key={label} className="mb-3">
                        <Col sm={3} className="label">{label}:</Col>
                        <Col sm={9}>{value}</Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default PersonList
