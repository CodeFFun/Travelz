const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    user: prisma.user,
    review: prisma.review,
    guide: prisma.guide,
    booking:prisma.booking,
    diary:prisma.diary,
    destination:prisma.destination
}