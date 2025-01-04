interface Profile {
  ranking: number;
  realName: string;
  userAvatar: string;
  aboutMe: string;
  countryName: string;
  company: string | null;
  jobTitle: string | null;
}

export interface User {
  profile: Profile;
  username: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
}
