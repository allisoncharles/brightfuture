import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($user: UserInput!) {
    createUser(user: $user) {
      name
      regno
      email
      class
      arm
      role
      profileImg
    }
  }
`;

export const UPLOAD_USERS = gql`
  mutation UploadUsers($users: [UserInput]) {
    uploadUsers(users: $users) {
      name
      regno
      email
      class
      arm
      role
      profileImg
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeletUser($regno: String!) {
    deleteUser(regno: $regno)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($regno: String!, $user: UpdateUserInput) {
    updateUser(regno: $regno, user: $user) {
      name
      regno
      email
      class
      arm
      role
      profileImg
    }
  }
`;

export const LOGIN = gql`
  mutation Login($user: LoginInput!) {
    loginUser(user: $user) {
      user {
        name
        regno
        email
        role
      }
      access_token
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews($_id: ID!, $news: UpdateNewsInput) {
    updateNews(_id: $_id, news: $news) {
      _id
      newsTitle
      newsImg
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($_id: ID!) {
    deleteNews(_id: $_id)
  }
`;

export const ADD_NEWS = gql`
  mutation AddNews($news: NewsInput!) {
    createNews(news: $news) {
      _id
      newsTitle
      newsImg
    }
  }
`;

export const ADD_GALLERY = gql`
  mutation AddGallery($gallery: GalleryInput!) {
    createGallery(gallery: $gallery) {
      _id
      galleryTitle
      galleryImg
    }
  }
`;

export const UPDATE_GALLERY = gql`
  mutation UpdateGallery($_id: ID!, $gallery: UpdateGalleryInput) {
    updateGallery(_id: $_id, gallery: $gallery) {
      _id
      galleryTitle
      galleryImg
    }
  }
`;

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($_id: ID!) {
    deleteGallery(_id: $_id)
  }
`;

export const ADD_FEATURED = gql`
  mutation AddFeatured($featured: FeaturedInput!) {
    createFeatured(featured: $featured) {
      _id
      featuredTitle
      featuredText
      featuredImg
    }
  }
`;

export const UPDATE_FEATURED = gql`
  mutation UpdateFeatured($_id: ID!, $featured: UpdateFeaturedInput) {
    updateFeatured(_id: $_id, featured: $featured) {
      _id
      featuredTitle
      featuredText
      featuredImg
    }
  }
`;

export const DELETE_FEATURED = gql`
  mutation DeleteFeatured($_id: ID!) {
    deleteFeatured(_id: $_id)
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($event: EventInput!) {
    createEvent(event: $event) {
      _id
      eventTitle
      eventHost
      eventDate
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($_id: ID!, $event: UpdateEventInput) {
    updateEvent(_id: $_id, event: $event) {
      _id
      eventTitle
      eventHost
      eventDate
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($_id: ID!) {
    deleteEvent(_id: $_id)
  }
`;

export const ADD_FACE = gql`
  mutation AddFace($face: FaceInput!) {
    createFace(face: $face) {
      _id
      faceTitle
      faceImg
    }
  }
`;

export const UPDATE_FACE = gql`
  mutation UpdateFace($_id: ID!, $face: UpdateFaceInput) {
    updateFace(_id: $_id, face: $face) {
      _id
      faceTitle
      faceImg
    }
  }
`;

export const DELETE_FACE = gql`
  mutation DeleteFace($_id: ID!) {
    deleteFace(_id: $_id)
  }
`;

export const DELETE_SETTING = gql`
  mutation DeleteSetting($_id: ID!) {
    deleteSetting(_id: $_id)
  }
`;

export const ADD_SETTING = gql`
  mutation AddSetting($setting: SettingInput!) {
    createSetting(setting: $setting) {
      session
    }
  }
`;

export const DELETE_RESULT = gql`
  mutation DeleteResult($regno: String!, $term: String!, $session: String!) {
    deleteResult(regno: $regno, term: $term, session: $session)
  }
`;

export const UPDATE_RESULT = gql`
  mutation UpdateResult($regno: String!, $result: UpdateResultInput) {
    updateResult(regno: $regno, result: $result) {
      user {
        name
        regno
      }
      regno
      sex
      dob
      class
      club
      term
      session
      open
      arm
      open
      present
      avg
      cumm
      noInClass
      sch_open
      teacher
      head
      subjects {
        eng {
          ca
          exam
          total
        }
        math {
          ca
          exam
          total
        }
        bstit {
          ca
          exam
          total
        }
        bst {
          ca
          exam
          total
        }
        bs {
          ca
          exam
          total
        }
        rnvce {
          ca
          exam
          total
        }
        rnvse {
          ca
          exam
          total
        }
        rnvcrs {
          ca
          exam
          total
        }
        agr_sc {
          ca
          exam
          total
        }
        pvsagr {
          ca
          exam
          total
        }
        pvshe {
          ca
          exam
          total
        }
        food {
          ca
          exam
          total
        }
        bt {
          ca
          exam
          total
        }
        ce {
          ca
          exam
          total
        }
        hand {
          ca
          exam
          total
        }
        heaha {
          ca
          exam
          total
        }
        lite {
          ca
          exam
          total
        }
        nume {
          ca
          exam
          total
        }
        phon {
          ca
          exam
          total
        }
        bstphe {
          ca
          exam
          total
        }
        qr {
          ca
          exam
          total
        }
        rhy {
          ca
          exam
          total
        }
        sosha {
          ca
          exam
          total
        }
        vr {
          ca
          exam
          total
        }
        cca {
          ca
          exam
          total
        }
        comp {
          ca
          exam
          total
        }
        reknow {
          ca
          exam
          total
        }
        he {
          ca
          exam
          total
        }
        sos {
          ca
          exam
          total
        }
        phe {
          ca
          exam
          total
        }
        yoruba {
          ca
          exam
          total
        }
        se {
          ca
          exam
          total
        }
        french {
          ca
          exam
          total
        }
        lit {
          ca
          exam
          total
        }
        comm {
          ca
          exam
          total
        }
        govt {
          ca
          exam
          total
        }
        vocap {
          ca
          exam
          total
        }
        current {
          ca
          exam
          total
        }
        moral {
          ca
          exam
          total
        }
        market {
          ca
          exam
          total
        }
        bio {
          ca
          exam
          total
        }
        crs {
          ca
          exam
          total
        }
        econ {
          ca
          exam
          total
        }
        phy {
          ca
          exam
          total
        }
        chem {
          ca
          exam
          total
        }
        fmath {
          ca
          exam
          total
        }
        geog {
          ca
          exam
          total
        }
        f_acc {
          ca
          exam
          total
        }
      }
    }
  }
`;

export const UPLOAD_RESULT = gql`
  mutation UploadResult($result: [ResultInput]) {
    uploadResult(result: $result) {
      user {
        name
        regno
        email
        role
        profileImg
        passcode
      }
      regno
      sex
      dob
      class
      club
      term
      session
      open
      arm
      open
      present
      avg
      cumm
      noInClass
      sch_open
      teacher
      head
      subjects {
        eng {
          ca
          exam
          total
        }
        math {
          ca
          exam
          total
        }
        bstit {
          ca
          exam
          total
        }
        bst {
          ca
          exam
          total
        }
        bs {
          ca
          exam
          total
        }
        rnvce {
          ca
          exam
          total
        }
        rnvse {
          ca
          exam
          total
        }
        rnvcrs {
          ca
          exam
          total
        }
        agr_sc {
          ca
          exam
          total
        }
        pvsagr {
          ca
          exam
          total
        }
        pvshe {
          ca
          exam
          total
        }
        food {
          ca
          exam
          total
        }
        bt {
          ca
          exam
          total
        }
        ce {
          ca
          exam
          total
        }
        hand {
          ca
          exam
          total
        }
        heaha {
          ca
          exam
          total
        }
        lite {
          ca
          exam
          total
        }
        nume {
          ca
          exam
          total
        }
        phon {
          ca
          exam
          total
        }
        bstphe {
          ca
          exam
          total
        }
        qr {
          ca
          exam
          total
        }
        rhy {
          ca
          exam
          total
        }
        sosha {
          ca
          exam
          total
        }
        vr {
          ca
          exam
          total
        }
        cca {
          ca
          exam
          total
        }
        comp {
          ca
          exam
          total
        }
        reknow {
          ca
          exam
          total
        }
        he {
          ca
          exam
          total
        }
        sos {
          ca
          exam
          total
        }
        phe {
          ca
          exam
          total
        }
        yoruba {
          ca
          exam
          total
        }
        se {
          ca
          exam
          total
        }
        french {
          ca
          exam
          total
        }
        lit {
          ca
          exam
          total
        }
        comm {
          ca
          exam
          total
        }
        govt {
          ca
          exam
          total
        }
        vocap {
          ca
          exam
          total
        }
        current {
          ca
          exam
          total
        }
        moral {
          ca
          exam
          total
        }
        market {
          ca
          exam
          total
        }
        bio {
          ca
          exam
          total
        }
        crs {
          ca
          exam
          total
        }
        econ {
          ca
          exam
          total
        }
        phy {
          ca
          exam
          total
        }
        chem {
          ca
          exam
          total
        }
        fmath {
          ca
          exam
          total
        }
        geog {
          ca
          exam
          total
        }
        f_acc {
          ca
          exam
          total
        }
      }
    }
  }
`;
