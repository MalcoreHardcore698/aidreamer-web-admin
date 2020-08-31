export default {
    button: {
        default: `function Button(Object options)
options(
    String title,
    Array routes,
    Function hideModal,
    ?home: null,
    ?closeByBackground: true
)`,
    example: `<Button options={{ type: 'flat', state: 'active' }}>
    <p>See All</p>
</Button>

<Button options={{ type: 'icon', state: 'disabled' }}>
    <FontAwesomeIcon icon={faFire} />
</Button>`
},
    modal: {
        default: `function Modal(Object options)
options(
    Array routes,
    String, Function hideModal,
    ?title, ReactNode ?home,
    Boolean ?closeByBackground: true
)`,
    example: `<Button options={{
    type: 'active',
    handler: () => showModal([
        {
            path: '/',
            title: 'Welcome to AidReamer!',
            component: ({ jump }) => <ArticleEdit jump={jump} />
        },
        {
            path: '/gallery',
            title: 'Step 1',
            component: ({ jump }) => <ChooseImage jump={jump} />
        },
        {
            path: '/gallery/info',
            title: 'Step 2',
            component: () => <InfoImage />
        }
    ])
}}>
    <p>Modal with many depths</p>
</Button>

<Modal options={{
    routes: content,
    hideModal
}} />`
    },
    counterBadge: {
        default: `function CounterBadge(Object options)
options(
    Number count,
    String ?type: 'oval',
    String ?color: 'white',
    String ?background: 'accent',
)`,
    example: `<CounterBadge options={{
    count: 5,
    type: 'oval',
    color: 'white',
    background: 'var(--color-accent)',
}} />`
    },
    alert: {
        default: `function Alert(String type, String message)`,
        example: `<Alert type="error" message="Error Message" />`
    },
    search: {
        default: `function Search(Object options, Boolean filter)
options(
    String type,
    String placeholder,
    Function onChange
)`,
        example: `<Search
    options={{
        placeholder="Search"
    }}
    filter={true}
/>`
    },
    asycSection: {
        default: `function AsyncSection()`,
        example: ``
    },
    avatar: {
        default: `function Avatar(Object avatar, Array properties)`,
        example: `<Avatar
    avatar={{
        path: ImageAvatar
    }}
    properties={['x64']}
    // x64, x128, x256, circle
/>`
    },
    carousel: {
        default: `function Carousel(Object options)`,
        example: ``
    },
    checkbox: {
        default: `function Checkbox(Object options)
options(
    String type,
    Array list: [],
    Function handler
)
list(
    Number id,
    String value,
    Boolean checked
)`,
        example: `const [items, setItems] = useState([
    { id: 0, value: 'Item 1', checked: true },
    { id: 1, value: 'Item 2', checked: false },
    { id: 2, value: 'Item 3', checked: true }
])

<Checkbox options={{
    list: items,
    handler: setItems
}} />`
    },
    radiobox: {
        default: `function Radiobox(Object options)
options(
    String type,
    Array list: [],
    Function handler
)`,
        example: `<Radiobox options={{
    list: items,
    handler: setItems
}} />`
    },
    colorPicker: {
        default: `function ColorPicker()`,
        example: ``
    },
    datePicker: {
        default: `function DatePicker()`,
        example: ``
    },
    divider: {
        default: `function Divider()`,
        example: ``
    },
    dropdown: {
        default: `function Dropdown(Object options)
options(
    String type,
    Boolean dropdown,
    Object styles
)`,
        example: `<Container clear sticky>
<Button options={{
    state: 'active',
    handler: () => setDropdown1(!dropdown1)
}}>
    <p>See Article</p>
</Button>

<Dropdown options={{ dropdown: dropdown1, styles: { left: 0, width: 320 } }}>
    <Entry options={{
        userBar: {
            name: 'noctua',
            status: 'online',
            avatar: ImageAvatar
        },
        statusBar: [
            { lite: 'Comments', dark: '47' },
            { lite: 'Views', dark: '13,541' },
            { lite: 'May, 16', dark: '14:15 AM' }
        ]
    }}>
        <img className="image" src={ImageArticle} alt="Article" />
        <h2 className="title">Need a teammate</h2>
        <p className="paragraph">Some text for opinion</p>
    </Entry>
</Dropdown>
</Container>`
    },
    slider: {
        default: `function Slider(Object options)
options(
    String type,
    Number points,
    String state,
    String color
)`,
        example: `<Slider options={{
    points: 5,
    state: 'inactive'
}} />`
    },
    toggler: {
        default: `function Toggler(Object options)
options(
    Object state,
    Function handler,
    Array targets: []
)`,
        example: `<Toggler options={{
    targets: [
        { type: 'all', value: <p>All</p> },
        { type: 'last', value: <FontAwesomeIcon icon={faClock} /> },
        { type: 'popular', value: <FontAwesomeIcon icon={faFire} /> }
    ]
}} />`
    },
    list: {
        default: `function List()`,
        example: ``
    },
    input: {
        default: `function Input(Object options)
options(
    String type,
    String placeholder,
    Function onChange
)`,
        example: `<Input options={{
    type: 'text',
    placeholder: 'Enter your text'
}} />`
    },
    textArea: {
        default: `function TextArea(Object options)
options(
    String type,
    String placeholder,
    Boolean resize,
    Function onChange
)`,
        example: `<TextArea options={{
    placeholder: 'Write a message'
}} />`
    },
    select: {
        default: `function Select()`,
        example: ``
    },
    section: {
        default: `function Section(Object options)
options(
    String name,
    String title,
    String subtitle,
    Boolean manage: true,
    Boolean filter: false,
    Array targets
)`,
        example: `<Section options={{
    name: 'user-tours',
    title: 'My Tours',
    subtitle: tours.length,
    filter: true,
    targets
}}>
    ...
</Section>`
    },
    message: {
        default: `function Message(String text, Boolean padding)`,
        example: `<Message text="No Content" padding />`
    },
    notify: {
        default: `function Notify(Object options)
options(
    String type,
    String area,
    Object avatar,
    String message
)`,
        example: `<Notify options={{
    area: 'admin',
    type: 'warning',
    message: 'Neccessary filled all fileds'
}} />`
    },
    navigation: {
        default: `function Navigation(Object options)
options(
    Array links,
    Array buttons,
    String axis
)`,
        example: `const [state, setModal] = useState()

const showModal = (state) => setModal(state)
const hideModal = () => setModal(null)

const buttons = [
    getButton(showModal, routes, faBell),
    getButton(showModal, routes, faCog)
]

<Navigation options={{
    links, buttons
}} />

<Modal options={{
    routes: state,
    hideModal
}} />`
    },
    entry: {
        default: `function Entry(Object options)
options(
    Object ?userBar,
    Object ?statusBar,
    Boolean ?editable: false,
    Boolean ?capacious: true,
    Boolean ?manageOffset: false
)`,
        example: `<Entry options={{
    userBar: {
        name: 'noctua',
        status: 'online',
        avatar: ImageAvatar
    },
    statusBar: [
        { lite: 'May, 16', dark: '14:15 AM' }
    ]
}}>
    <h2 className="title">Need a teammate</h2>
</Entry>

<Entry options={{
    editable: true,
    capacious: false,
    manageOffset: true,
    statusBar: [
        { lite: 'Participants', dark: 10 },
        { lite: 'Date', dark: '21 December - 25 December' },
        { lite: 'Prize Pool', dark: '1,000,000 USD' },
        { lite: 'Location', dark: 'London' }
    ]
}}>
    <img className="image" src={ImageTourPoster} alt="Tour" />
    <h2 className="title separeted">
        <span>Ignition Series 2020</span><span>Offcial</span>
    </h2>
</Entry> `
    },
    skeleton: {
        default: `function Skeleton(String component, Object options)
options(
    Number widthRandomness,
    Number heightRandomness,
    String width,
    String height,
    String borderRadius,
    String color,
    Number count,
    Boolean animated
)`,
        example: `<Skeleton
    component="entry"
    options={{
        width: 480,
        height: 350,
        widthRandomness: 0
    }}        
/>`
    },
    table: {
        default: `function Table(Array data, Array ?actions)
data(
    // Define columns
    { String header, Any value, String type },
    ...
)
action(
    // Define manage actions
    ({ Array ?table, Boolean ?dishands }) => (
        ...
    ),
    ...
)`,
        example: `<Table options={{
    data: users.map(user => ([
        { header: 'ID', value: user.id, type: 'text', visible: false },
        { header: 'Аватар', value: user.avatar.path, type: 'img' },
        { header: 'Имя', value: user.name, type: 'text' },
        { header: 'Пароль', value: user.password, type: 'text' },
        { header: 'Email', value: user.email, type: 'text' },
        { header: 'Телефон', value: user.phone, type: 'text' },
        { header: 'Роль', value: user.role, type: 'text' },
        { header: 'Баланс', value: user.balance, type: 'text' },
        { header: 'Дата последнего входа', value: user.dateLastAuth, type: 'text', visible: false },
        { header: 'Дата регистрации', value: user.dateRegistration, type: 'twxt', visible: false },
        { header: 'Подтвержден Email', value: user.isVerifiedEmail, type: 'text', visible: false },
        { header: 'Подтвержден телефон', value: user.isVerifiedPhone, type: 'text', visible: false },
        { header: 'Включены уведомления', value: user.isNotified, type: 'text', visible: false }
    ])),
    actions: [
        ({ table, dishands }) => (
            <Button options={{
                type: 'icon',
                state: (dishands) ? 'disable' : 'active',
                disabled: dishands,
                classNames: 'stretch',
                handler: () => {
                    dispatch(setDocuments(table.filter(t => t.checked)))
                    showModal([
                        {
                            path: '/',
                            title: 'Are you sure you want to delete this document?',
                            component: ({ close }) => <Alert close={close} />
                        }
                    ])
                }
            }}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        ),
        ({ dishands }) => (
            <Button options={{
                type: 'icon',
                state: (dishands) ? 'disable' : 'active',
                disabled: dishands,
                classNames: 'stretch',
                handler: () => showModal([
                    {
                        path: '/',
                        title: 'Welcome to AidReamer!',
                        component: ({ jump }) => <ArticleEdit jump={jump} />
                    },
                    {
                        path: '/gallery',
                        title: 'Step 1',
                        component: ({ jump }) => <ChooseImage jump={jump} />
                    },
                    {
                        path: '/gallery/info',
                        title: 'Step 2',
                        component: () => <InfoImage />
                    }
                ])
            }}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        ),
        ({ dishands }) => (
            <Button options={{
                type: 'icon',
                state: (dishands) ? 'disable' : 'active',
                disabled: dishands,
                classNames: 'stretch',
                handler: () => showModal([
                    {
                        path: '/',
                        title: 'Welcome to AidReamer!',
                        component: ({ jump }) => <ArticleEdit jump={jump} />
                    },
                    {
                        path: '/gallery',
                        title: 'Step 1',
                        component: ({ jump }) => <ChooseImage jump={jump} />
                    },
                    {
                        path: '/gallery/info',
                        title: 'Step 2',
                        component: () => <InfoImage />
                    }
                ])
            }}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        )
    ]
}} />

<Modal options={{
    routes: state,
    hideModal
}} />`
    },
    transaction: {
        default: `function Transaction()`,
        example: ``
    },
    grid: {
        default: `function Grid()`,
        example: `<Grid />`
    }
}