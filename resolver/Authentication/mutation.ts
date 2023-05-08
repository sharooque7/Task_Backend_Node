import validator from "validator";
import { hashService } from "../../utils/auth.js";
import { GraphQLError } from "graphql";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface user {
  name: string;
  password: string;
  email: string;
}

interface login {
  email: string;
  password: string;
}
interface context {
  token: string;
}
export const register = async (parent: any, { input }: any) => {
  try {
    const { name, email, password }: user = input;
    if (email === "" || password === "" || name === "") {
      throw new GraphQLError("Please provide a attributes", {
        extensions: {
          code: 400,
          message: "Please provide a email and password",
        },
      });
    }
    if (!validator.isEmail(email))
      throw new GraphQLError("Invalid Email-id Please type a valid email-id ", {
        extensions: { code: 400, message: "please provide valid email-id" },
      });
    const user = await prisma.user.findUnique({
      where: {
        email_id: email,
      },
    });

    if (user) {
      throw new GraphQLError("Email-id exist in Database please login", {
        extensions: {
          code: 409,
          message: "Email exist please provide alternate one or login",
        },
      });
    }

    const hashedPassword = await hashService.encryptPassword(password);
    let newUser: Prisma.UserCreateInput;
    newUser = {
      email_id: email,
      user_name: name,
      password: hashedPassword,
    };

    const result = await prisma.user.create({ data: newUser });

    return {
      message: "Registration successfull! Please login",
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      error: error,
      statusCode: error.extensions.code,
    };
  } finally {
    prisma.$disconnect();
  }
};

export const login = async (parent: any, { input }: any, context: context) => {
  try {
    const { email, password }: login = input;

    console.log(email, password);
    if (email === "" || password === "") {
      throw new GraphQLError("Please provide valid attributes", {
        extensions: {
          code: 400,
          message: "Please provide a email and password",
        },
      });
    }

    if (!validator.isEmail(email))
      throw new GraphQLError("Invalid Email-id Please type a valid email-id ", {
        extensions: {
          code: 400,
          message: "please provide valid email-id",
        },
      });
    const user = await prisma.user.findUnique({
      where: {
        email_id: email,
      },
    });

    if (!user) {
      throw new GraphQLError("User doesn't exist! Please register ", {
        extensions: {
          code: 404,
          message: "please register! user not found",
        },
      });
    }

    console.log("dd");
    const passwordIsValid = await hashService.decryptPassword(
      password,
      user?.password
    );
    console.log("ss");

    if (!passwordIsValid) {
      throw new GraphQLError("Please check the password! Access denied", {
        extensions: {
          code: 401,
          message: "password error",
        },
      });
    }

    let token = await hashService.createToken(user.email_id);

    console.log(token);

    return {
      message: "Success",
      token,
      statusCode: 200,
      user: {
        username: user.user_name,
        emailid: user.email_id,
        id: user.id,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      error: error,
      statusCode: error.extensions.code,
    };
  } finally {
    prisma.$disconnect();
  }
};

// export const changePassword = async (parent: any, { email }: any) => {
//   if (!validator.isEmail(email)) {
//     throw new GraphQLError("Invalid Email-id Please type a valid email-id ", {
//       extensions: {
//         code: 400,
//         message: "please provide valid email-id",
//       },
//     });
//   }
//   const user = await prisma.user.findUnique({
//     where: {
//       email_id: email,
//     },
//   });
//   if (!user) {
//     throw new GraphQLError("User doesn't exist! Please register ", {
//       extensions: {
//         code: 404,
//         message: "please register! user not found",
//       },
//     });
//   }
//   const secret = "secret";
//   const hash = crypto
//     .createHmac("sha256", secret)
//     .update("This is secret")
//     .digest("hex");
//   const token = hashService.createToken(hash);
//   const reset = await prisma.reset.create({
//     data: {
//       email: email,
//       token: token,
//     },
//   });
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "",
//       pass: "",
//     },
//   });
// };
interface token {
  token: string;
}
export const test = async (parent: any, args: any, context: token) => {
  // const movie = prisma.movie.deleteMany({});
  // const reviews = prisma.review.deleteMany({});
  // const user = prisma.user.deleteMany({});
  // prisma.$transaction([reviews, movie]);

  // const count = await prisma.movie.createMany({
  //   data: [
  //     {
  //       movie_name: "Sisu",
  //       description:
  //         'Watching the Nazis being savagely killed in "Sisu" may trigger a sense of moral unease, but the film\'s intense entertainment value cannot be denied. This action-packed drama outshines even the "John Wick" series in terms of thrilling, high-octane action.',
  //       director_name: "Jalmari-Helander",
  //       release_date: new Date("2023-02-28 00:00:00"),
  //       user_id: 6,
  //     },
  //     {
  //       movie_name: "Chevalier",
  //       description:
  //         "Chevalier is a English movie released on 21 Apr, 2023. The movie is directed by Stephen Williams and featured Kelvin Harrison Jr., Samara Weaving, Lucy Boynton and Marton Csokas as lead characters. Other popular actor who was roped in for Chevalier is Minnie Driver.",
  //       director_name: "Stephen-Williams",
  //       release_date: new Date("2022-01-28 00:00:00"),
  //       user_id: 6,
  //     },
  //     {
  //       movie_name: "The Inspectionsc ",
  //       description:
  //         "The story commences in 2005, centering around Ellis French, a gay African American man. At the age of 25, Ellis had already been living independently for some time, having become estranged from his mother due to her religious beliefs that did not accept his sexuality. After struggling to succeed in various endeavours and finding himself on the brink of drug addiction and loneliness, Ellis decides to enlist in the Marines and enrolls in a boot camp.",
  //       director_name: "Elegance-Bratton",
  //       release_date: new Date("2022-08-22 00:00:00"),
  //       user_id: 7,
  //     },
  //     {
  //       movie_name: "Renfield",
  //       description:
  //         "manipulate and destroy people, physically and mentally. One of his victims is Renfield, who has been mindlessly serving blood to his boss as he temporarily transforms into a killing machine. But he wants out after his chance encounter with an honest cop Rebecca Quincy (Awkwafina), who is nursing her old wounds. Together, they are up for some real trouble and a lot of violence.",
  //       director_name: "Chris-McKay",
  //       release_date: new Date("2022-10-22 00:00:00"),
  //       user_id: 7,
  //     },
  //     {
  //       movie_name: "Marlowe",
  //       description:
  //         "Set in 1939 Los Angeles, Rich heiress Clare Cavendish engages private investigator Phillip Marlowe to look into the disappearance of Nico, her ex-lover. The wealthy heiress tells the detective that she has seen him and is still very much alive, despite the fact that the majority of people think he is dead. When Marlowe meets people like Floyd Hanson, the manager of Corbata Club, Nico’s sister, and Lou Hendricks, a drug dealer, his subsequent investigations send him spiraling into a vortex of mystery.",
  //       director_name: "Neil-Jordan",
  //       release_date: new Date("2023-01-12 00:00:00"),
  //       user_id: 7,
  //     },
  //     {
  //       movie_name: "Beau Is Afraid",
  //       description:
  //         "Beau Is Afraid is a English movie released on 28 Apr, 2023. The movie is directed by Ari Aster and featured Joaquin Phoenix, Parker Posey, Amy Ryan and Nathan Lane as lead characters.",
  //       director_name: "Ari-Asternew",
  //       release_date: new Date("2020-02-28 00:00:00"),
  //       user_id: 8,
  //     },
  //     {
  //       movie_name: "The Lost King",
  //       description:
  //         "A charming celebration of the human spirit, driven by a perceptive performance from Sally Hawkins.",
  //       director_name: "Stephen-Frears",
  //       release_date: new Date("2022-01-08 00:00:00"),
  //       user_id: 8,
  //     },
  //     {
  //       movie_name: "All of Those Voices",
  //       description:
  //         "'All of Those Voices' is a powerful documentary that beautifully chronicles Louis Tomlinson's journey from being a member of One Direction to launching his career as a solo artist.",
  //       director_name: "Charlie-Lightening",
  //       release_date: new Date("2022-01-08 00:00:00"),
  //       user_id: 9,
  //     },
  //     {
  //       movie_name: "Tar",
  //       description:
  //         'The central focus of "Tár" is Lydia Tár, who has made history as the first female conductor of the Berlin Philharmonic. Her partner, Sharon, and her assistant, Francesca, provide constant support in her life. The movie begins with Lydia promoting her upcoming live recording of Mahler\'s Fifth Symphony at the New Yorker Film Festival.',
  //       director_name: "Todd-Field",
  //       release_date: new Date("2022-08-18 00:00:00"),
  //       user_id: 9,
  //     },
  //     {
  //       movie_name: "Triangle of Sadness",
  //       description:
  //         "Although some of its sting may be ironically dulled by the very indulgence it seeks to admonish, ‘Triangle of Sadness’ demands introspection into what is truly valuable in today’s world.",
  //       director_name: "Ruben-Ostlund",
  //       release_date: new Date("2023-03-18 00:00:00"),
  //       user_id: 9,
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  const review = await prisma.review.createMany({
    data: [
      {
        movie_id: 7,
        user_id: 6,
        rating: 4.5,
        comment: "The Lost king is the best sequence",
      },
      {
        movie_id: 7,
        user_id: 7,
        rating: 4.7,
        comment: "Sequence is awesome",
      },
      {
        movie_id: 7,
        user_id: 9,
        rating: 1,
        comment: "Worst movie ever",
      },
      {
        movie_id: 10,
        user_id: 9,
        rating: 4.5,
        comment: "Traingle of sadness .Movie is not as it sound's",
      },
      {
        movie_id: 8,
        user_id: 8,
        rating: 4.5,
        comment: "One of the best voices in all of the voices",
      },
    ],
    skipDuplicates: true,
  });

  console.log(context.token);
  try {
    const verify = hashService.verifyToken(context.token);

    return { message: "ok" };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      error,
    };
  }
};
