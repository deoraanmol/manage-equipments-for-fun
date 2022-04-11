export const MOCK_CREDENTIALS = "test"

export const MOCK_ADMIN = {
    "id": 1,
    "username": "admin",
    "roles": [
        "AdminContractor"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVzIjpbIkFkbWluQ29udHJhY3RvciJdLCJpYXQiOjE2NDk2MjA5MTYsImV4cCI6MTY0OTcwNzMxNn0.nUp7RpY0OSK4WiWTjIhF-fpgCGxyD5tSrndKCvXfAaw"
}

export const MOCK_ADMIN_CONTRACTOR_RESPONSE = new Response(JSON.stringify(MOCK_ADMIN));

export const MOCK_BOOKED_EQUIPMENTS_RESPONSE = new Response(JSON.stringify([
    {
        "id": 2,
        "serial_number": "AUS_1",
        "title": "CAT 6090 Hydraulic Shovel",
        "model": "6090",
        "username": "gandlaf_the_white"
    }
]))

export const MOCK_AVAILABLE_EQUIPMENTS_RESPONSE = new Response(JSON.stringify([
    {
        "id": 3,
        "serial_number": "AUS_2",
        "title": "CAT 6090 Hydraulic Shovel",
        "model": "6090"
    }
]))