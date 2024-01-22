import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getAllUsers {
      name
      regno
      email
      class
      arm
      role
      profileImg
      passcode
    }
  }
`;

export const GET_USER = gql`
  query GetUser($regno: String!) {
    getUser(regno: $regno) {
      regno
      name
      email
      class
      arm
      profileImg
      role
      passcode
    }
  }
`;

export const GET_ALL_NEWS = gql`
  query {
    getAllNews {
      _id
      newsTitle
      newsImg
      createdAt
    }
  }
`;

export const GET_NEWS = gql`
  query GetNews($_id: ID!) {
    getNews(_id: $_id) {
      _id
      newsTitle
      newsImg
      createdAt
    }
  }
`;

export const GET_ALL_GALLERY = gql`
  query {
    getAllGallery {
      _id
      galleryTitle
      galleryImg
    }
  }
`;

export const GET_GALLERY = gql`
  query GetGallery($_id: ID!) {
    getGallery(_id: $_id) {
      _id
      galleryTitle
      galleryImg
    }
  }
`;

export const GET_ALL_FEATURED = gql`
  query GetAllFeatured {
    getAllFeatured {
      _id
      featuredTitle
      featuredText
      featuredImg
    }
  }
`;

export const GET_FEATURED = gql`
  query GetFeatured($_id: ID!) {
    getFeatured(_id: $_id) {
      _id
      featuredTitle
      featuredText
      featuredImg
    }
  }
`;

export const GET_ALL_EVENT = gql`
  query GetAllEvent {
    getAllEvent {
      _id
      eventTitle
      eventHost
      eventDate
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($_id: ID!) {
    getEvent(_id: $_id) {
      _id
      eventTitle
      eventHost
      eventDate
    }
  }
`;

export const GET_ALL_FACE = gql`
  query GetAllFace {
    getAllFace {
      _id
      faceTitle
      faceImg
    }
  }
`;

export const GET_FACE = gql`
  query GetFace($_id: ID!) {
    getFace(_id: $_id) {
      _id
      faceTitle
      faceImg
    }
  }
`;

export const GET_SETTING = gql`
  query GetAllSettings {
    getAllSettings {
      _id
      session
    }
  }
`;

export const GET_HOME = gql`
  query {
    getAllSettings {
      _id
      session
    }
    getAllFeatured {
      _id
      featuredTitle
      featuredText
      featuredImg
    }
    getAllNews {
      _id
      newsTitle
      newsImg
      createdAt
    }
    getAllEvent {
      _id
      eventTitle
      eventHost
      eventDate
    }
    getAllFace {
      _id
      faceTitle
      faceImg
    }
    getAllGallery {
      _id
      galleryTitle
      galleryImg
    }
  }
`;

export const GET__ALL__RESULT = gql`
  query GetAllResults {
    getAllResults {
      regno
      open
      session
      term
      sex
      dob
      present
      arm
      class
      club
      teacher
      head
      cumm
      avg
      noInClass
      sch_open
      user {
        name
        regno
        email
        role
        profileImg
        passcode
      }
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

export const GET__USERS__RESULT__CATEGORY = gql`
  query GetCateResult($result: GetUserResultCatInput!) {
    getCateResult(result: $result) {
      user {
        name
        regno
        email
        role
        profileImg
        passcode
      }
      sex
      regno
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
      teacher
      head
    }
  }
`;

export const GET_USER_RESULT = gql`
  query GetResult($result: GetUserResultInput!) {
    getResult(result: $result) {
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

export const GET_RESULT = gql`
  query GetUserResult($result: UserResultInput!) {
    getUserResult(result: $result) {
      user {
        name
        regno
        email
        role
        profileImg
        passcode
      }
      sex
      regno
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
      teacher
      head
    }
  }
`;
