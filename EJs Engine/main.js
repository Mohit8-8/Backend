const express = require('express')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const blogs = [
    {
        slug: 'adidas-why-and-when',
        title: 'Adidas: Why and When?',
        content: 'Adidas is a very good brand, known for its quality and innovation in sportswear.',
        author: 'John Doe',
        date: '2025-07-03',
        tags: ['adidas', 'brand', 'sportswear']
    },
    {
        slug: 'nike-vs-adidas',
        title: 'Nike vs Adidas: The Ultimate Showdown',
        content: 'A deep dive into the rivalry between Nike and Adidas.',
        author: 'Jane Smith',
        date: '2025-06-28',
        tags: ['nike', 'adidas', 'comparison']
    },
    {
        slug: 'future-of-sportswear',
        title: 'The Future of Sportswear',
        content: 'Exploring trends and innovations shaping the future of sportswear.',
        author: 'Alex Lee',
        date: '2025-06-15',
        tags: ['future', 'sportswear', 'innovation']
    }
]

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user1', password: 'user123', role: 'user' }
]

function authenticate(req, res, next) {
    const { username, password } = req.cookies
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        req.user = user
    }
    next()
}

app.use(authenticate)

app.get('/', (req, res) => {
    const siteName = "Adidas"
    const searchText = "Search Now"
    const arr = ["Hey", 54, 65]
    res.render("index", { siteName, searchText, arr, blogs, user: req.user })
})

app.get('/blog/:slug', (req, res, next) => {
    const blog = blogs.find(b => b.slug === req.params.slug)
    if (!blog) {
        return next()
    }
    res.render("blogpost", { blogTitle: blog.title, blogContent: blog.content, author: blog.author, date: blog.date, tags: blog.tags })
})

app.get('/blogs', (req, res) => {
    res.render('blogs', { blogs })
})

app.get('/admin', (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).render('403')
    }
    res.render('admin', { user: req.user, blogs, users })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        res.cookie('username', username)
        res.cookie('password', password)
        return res.redirect('/')
    }
    res.render('login', { error: 'Invalid credentials' })
})

app.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.clearCookie('password')
    res.redirect('/')
})

app.use((req, res, next) => {
    res.status(404).render('404', { url: req.originalUrl })
})
                                                                            
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('error', { error: err })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

