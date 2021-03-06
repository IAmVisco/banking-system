require('./config/database')
const faker = require('faker')
const City = require('./models/city')
const Country = require('./models/country')
const Deposit = require('./models/deposit')
const Disability = require('./models/disability')
const MartialStatus = require('./models/martialStatus')
const Currency = require('./models/currency')
const User = require('./models/user')

const USERS_TO_GENERATE = 5

const createCity = () => ({ name: faker.address.city() })
const createCountry = () => ({ name: faker.address.country() })
const createDisability = () => ({ name: faker.lorem.word() })

const main = async () => {
  let cities
  if (await City.estimatedDocumentCount() === 0) {
    cities = await City.create(Array(5).fill(null).map(createCity))
    console.log('Seeded cities')
  } else {
    cities = await City.find({})
  }

  let countries
  if (await Country.estimatedDocumentCount() === 0) {
    countries = await Country.create(Array(5).fill(null).map(createCountry))
    console.log('Seeded countries')
  } else {
    countries = await Country.find({})
  }

  let disabilities
  if (await Disability.estimatedDocumentCount() === 0) {
    disabilities = await Disability.create(Array(5).fill(null).map(createDisability))
    console.log('Seeded disabilities')
  } else {
    disabilities = await Disability.find({})
  }

  let martialStatuses
  if (await MartialStatus.estimatedDocumentCount() === 0) {
    martialStatuses = await MartialStatus.create([
      { name: 'Single' },
      { name: 'Married' },
      { name: 'Divorced' }
    ])
    console.log('Seeded martial statuses')
  } else {
    martialStatuses = await MartialStatus.find({})
  }

  let currencies
  if (await Currency.estimatedDocumentCount() === 0) {
    currencies = await Currency.create([
      { name: 'US Dollar', short_name: 'USD', symbol: '$' },
      { name: 'Euro', short_name: 'EUR', symbol: '€' },
      { name: 'Belorussian Rouble', short_name: 'BYN', symbol: 'Br' }
    ])
    console.log('Seeded currencies')
  } else {
    currencies = await Currency.find({})
  }

  const usersObjects = Array(USERS_TO_GENERATE).fill(null).map(() => {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      middle_name: faker.name.firstName(),
      birth_date: faker.date.past(),
      passport_series: faker.lorem.word().substring(0, 2).toUpperCase(),
      passport_number: Math.floor(1000000 + Math.random() * 9000000).toString(),
      passport_issuer: faker.lorem.words(3),
      passport_issue_date: faker.date.past(3),
      id_number: faker.random.alphaNumeric(14),
      birth_place: faker.address.city(),
      current_city: cities[Math.floor(Math.random() * cities.length)]._id,
      current_address: faker.address.streetAddress(),
      email: faker.internet.email(),
      registered_city: cities[Math.floor(Math.random() * cities.length)]._id,
      martial_status: martialStatuses[Math.floor(Math.random() * martialStatuses.length)]._id,
      citizenship: countries[Math.floor(Math.random() * countries.length)]._id,
      disability: disabilities[Math.floor(Math.random() * disabilities.length)]._id,
      retired: faker.random.boolean(),
      monthly_income: faker.random.number(9999)
    }

    user.full_name = `${user.last_name.trim()} ${user.first_name.trim()} ${user.middle_name.trim()}`
    user.passport_full = `${user.passport_series.trim()}${user.passport_number.trim()}`

    return user
  })

  await User.create(usersObjects)
  console.log(`Seeded ${USERS_TO_GENERATE} users`)
  const users = await User.find({})

  const deposits = Array(USERS_TO_GENERATE).fill(null).map(() => {
    const sum = faker.random.number(9999)
    const deposit = {
      owner: users[Math.floor(Math.random() * users.length)]._id,
      type: Math.random() < 0.5 ? 1 : 2,
      currency: currencies[Math.floor(Math.random() * currencies.length)]._id,
      sum,
      balance: sum,
      percent: faker.random.number(15)
    }

    return deposit
  })

  await Deposit.create(deposits)
  console.log(`Seeded ${USERS_TO_GENERATE} deposits`)
}

main().then(() => {
  console.log('Successfully seeded')
  process.exit(0)
}).catch((err) => {
  console.error('The error has occurred', err)
  process.exit(1)
})
