import { gql } from "graphql-tag";

const typeDefs = gql`
  input UserInput {
    name: String!
    regno: String!
    email: String
    role: String
    class: String!
    arm: String!
    profileImg: String
  }

  type UserType {
    name: String!
    regno: String!
    email: String!
    role: String
    class: String!
    arm: String!
    profileImg: String
    passcode: String!
  }

  type SettingType {
    _id: ID
    session: String!
  }

  type LoggedInType {
    user: UserType
    access_token: String
  }

  type GalleryType {
    _id: ID
    galleryTitle: String!
    galleryImg: String!
  }

  type FaceType {
    _id: ID
    faceTitle: String!
    faceImg: String!
  }

  type EventType {
    _id: ID
    eventTitle: String!
    eventHost: String!
    eventDate: String!
  }

  type NewsType {
    _id: ID
    newsTitle: String!
    newsImg: String!
    createdAt: String
  }

  type FeaturedType {
    _id: ID
    featuredImg: String!
    featuredTitle: String!
    featuredText: String!
  }

  type SubjectType {
    ca: String
    exam: String
    total: String
  }

  type SubjectsType {
    eng: SubjectType!
    math: SubjectType!
    bstit: SubjectType!
    bst: SubjectType!
    bs: SubjectType!
    rnvce: SubjectType!
    rnvse: SubjectType!
    rnvcrs: SubjectType!
    agr_sc: SubjectType!
    pvsagr: SubjectType!
    pvshe: SubjectType!
    food: SubjectType!
    bt: SubjectType!
    ce: SubjectType!
    hand: SubjectType!
    heaha: SubjectType!
    lite: SubjectType!
    nume: SubjectType!
    phon: SubjectType!
    bstphe: SubjectType!
    qr: SubjectType!
    rhy: SubjectType!
    sosha: SubjectType!
    vr: SubjectType!
    cca: SubjectType!
    comp: SubjectType!
    reknow: SubjectType!
    he: SubjectType!
    sos: SubjectType!
    phe: SubjectType!
    yoruba: SubjectType!
    se: SubjectType!
    french: SubjectType!
    lit: SubjectType!
    comm: SubjectType!
    govt: SubjectType!
    vocap: SubjectType!
    current: SubjectType!
    moral: SubjectType!
    market: SubjectType!
    bio: SubjectType!
    crs: SubjectType!
    econ: SubjectType!
    phy: SubjectType!
    chem: SubjectType!
    fmath: SubjectType!
    geog: SubjectType!
    f_acc: SubjectType!
  }

  type ResultType {
    user: UserType
    regno: String!
    open: String!
    session: String!
    term: String!
    sex: String!
    dob: String!
    present: String!
    arm: String!
    class: String!
    club: String!
    subjects: SubjectsType
    teacher: String!
    head: String!
    cumm: String
    avg: String!
    noInClass: String!
    sch_open: String!
  }

  input GetUserResultCatInput {
    term: String!
    session: String!
  }

  input GetUserResultInput {
    regno: String!
    term: String!
    session: String!
  }

  #Queries
  type Query {
    getAllUsers: [UserType]
    getUser(regno: String!): UserType
    getAllResults: [ResultType]
    getResult(result: GetUserResultInput!): ResultType
    getCateResult(result: GetUserResultCatInput!): [ResultType]
    getAllFeatured: [FeaturedType]!
    getFeatured(_id: ID): FeaturedType!
    getAllNews: [NewsType!]!
    getNews(_id: ID!): NewsType!
    getAllGallery: [GalleryType!]!
    getGallery(_id: ID!): GalleryType!
    getAllEvent: [EventType!]!
    getEvent(_id: ID!): EventType!
    getAllFace: [FaceType!]!
    getFace(_id: ID!): FaceType!
    getUserResult(result: UserResultInput!): [ResultType]
    getAllSettings: [SettingType!]!
  }

  input UserResultInput {
    regno: String!
    session: String!
    passcode: String!
  }

  input InputSubject {
    ca: String!
    exam: String!
    total: String!
  }

  input UpdateInputSubject {
    ca: String
    exam: String
    total: String
  }

  input UpdateInputSubjects {
    eng: UpdateInputSubject
    math: UpdateInputSubject
    bstit: UpdateInputSubject
    bst: UpdateInputSubject
    bs: UpdateInputSubject
    rnvce: UpdateInputSubject
    rnvse: UpdateInputSubject
    rnvcrs: UpdateInputSubject
    agr_sc: UpdateInputSubject
    pvsagr: UpdateInputSubject
    pvshe: UpdateInputSubject
    food: UpdateInputSubject
    bt: UpdateInputSubject
    ce: UpdateInputSubject
    hand: UpdateInputSubject
    heaha: UpdateInputSubject
    lite: UpdateInputSubject
    nume: UpdateInputSubject
    phon: UpdateInputSubject
    bstphe: UpdateInputSubject
    qr: UpdateInputSubject
    rhy: UpdateInputSubject
    sosha: UpdateInputSubject
    vr: UpdateInputSubject
    cca: UpdateInputSubject
    comp: UpdateInputSubject
    reknow: UpdateInputSubject
    he: UpdateInputSubject
    sos: UpdateInputSubject
    phe: UpdateInputSubject
    yoruba: UpdateInputSubject
    se: UpdateInputSubject
    french: UpdateInputSubject
    lit: UpdateInputSubject
    comm: UpdateInputSubject
    govt: UpdateInputSubject
    vocap: UpdateInputSubject
    current: UpdateInputSubject
    moral: UpdateInputSubject
    market: UpdateInputSubject
    bio: UpdateInputSubject
    crs: UpdateInputSubject
    econ: UpdateInputSubject
    phy: UpdateInputSubject
    chem: UpdateInputSubject
    fmath: UpdateInputSubject
    geog: UpdateInputSubject
    f_acc: UpdateInputSubject
  }

  input InputSubjects {
    eng: InputSubject
    math: InputSubject
    bstit: InputSubject
    bst: InputSubject
    bs: InputSubject
    rnvce: InputSubject
    rnvse: InputSubject
    rnvcrs: InputSubject
    agr_sc: InputSubject
    pvsagr: InputSubject
    pvshe: InputSubject
    food: InputSubject
    bt: InputSubject
    ce: InputSubject
    hand: InputSubject
    heaha: InputSubject
    lite: InputSubject
    nume: InputSubject
    phon: InputSubject
    bstphe: InputSubject
    qr: InputSubject
    rhy: InputSubject
    sosha: InputSubject
    vr: InputSubject
    cca: InputSubject
    comp: InputSubject
    reknow: InputSubject
    he: InputSubject
    sos: InputSubject
    phe: InputSubject
    yoruba: InputSubject
    se: InputSubject
    french: InputSubject
    lit: InputSubject
    comm: InputSubject
    govt: InputSubject
    vocap: InputSubject
    current: InputSubject
    moral: InputSubject
    market: InputSubject
    bio: InputSubject
    crs: InputSubject
    econ: InputSubject
    phy: InputSubject
    chem: InputSubject
    fmath: InputSubject
    geog: InputSubject
    f_acc: InputSubject
  }

  input ResultInput {
    regno: String!
    open: String!
    session: String!
    term: String!
    sex: String!
    dob: String!
    present: String!
    arm: String!
    club: String!
    class: String!
    subjects: InputSubjects
    teacher: String!
    head: String!
    cumm: String
    avg: String!
    noInClass: String!
    sch_open: String!
  }

  input UpdateResultInput {
    regno: String
    open: String
    session: String
    term: String
    sex: String
    dob: String
    present: String
    arm: String
    class: String
    club: String
    subjects: UpdateInputSubjects
    teacher: String
    head: String
    cumm: String
    avg: String
    noInClass: String
    sch_open: String
  }

  input UpdateUserInput {
    name: String
    regno: String
    email: String
    class: String
    arm: String
    profileImg: String
    role: String
  }

  input FeaturedInput {
    featuredImg: String!
    featuredTitle: String!
    featuredText: String!
  }

  input UpdateFeaturedInput {
    featuredImg: String
    featuredTitle: String
    featuredText: String
  }

  input NewsInput {
    newsTitle: String!
    newsImg: String!
  }

  input EventInput {
    eventTitle: String!
    eventHost: String!
    eventDate: String!
  }

  input UpdateEventInput {
    eventTitle: String
    eventHost: String
    eventDate: String
  }

  input UpdateNewsInput {
    newsTitle: String
    newsImg: String
  }

  input GalleryInput {
    galleryTitle: String!
    galleryImg: String
  }

  input UpdateGalleryInput {
    galleryTitle: String
    galleryImg: String
  }

  input LoginInput {
    regno: String!
    passcode: String!
  }

  input SettingInput {
    session: String!
  }

  input FaceInput {
    faceTitle: String!
    faceImg: String!
  }
  input UpdateFaceInput {
    faceTitle: String
    faceImg: String
  }

  #Mutations
  type Mutation {
    createUser(user: UserInput!): UserType!
    updateUser(regno: String!, user: UpdateUserInput): UserType!
    deleteUser(regno: String!): String
    uploadUsers(users: [UserInput]): [UserType]
    uploadResult(result: [ResultInput]): [ResultType]
    createResult(result: ResultInput): ResultType!
    updateResult(regno: String!, result: UpdateResultInput): ResultType!
    deleteResult(regno: String!, term: String!, session: String!): String
    createFeatured(featured: FeaturedInput!): FeaturedType!
    updateFeatured(_id: ID!, featured: UpdateFeaturedInput): FeaturedType!
    deleteFeatured(_id: ID!): String
    createNews(news: NewsInput!): NewsType!
    updateNews(_id: ID!, news: UpdateNewsInput): NewsType!
    deleteNews(_id: ID!): String
    createGallery(gallery: GalleryInput!): GalleryType!
    updateGallery(_id: ID!, gallery: UpdateGalleryInput): GalleryType!
    deleteGallery(_id: ID!): String
    createEvent(event: EventInput!): EventType!
    updateEvent(_id: ID!, event: UpdateEventInput): EventType!
    deleteEvent(_id: ID!): String
    createFace(face: FaceInput!): FaceType!
    updateFace(_id: ID!, face: UpdateFaceInput): FaceType!
    deleteFace(_id: ID!): String
    loginUser(user: LoginInput!): LoggedInType!
    createSetting(setting: SettingInput!): SettingType!
    deleteSetting(_id: ID!): String
  }
`;

export default typeDefs;
