import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.movie.createMany({
        data: [
            {
                movie_name: "Sisu",
                description: 'Watching the Nazis being savagely killed in "Sisu" may trigger a sense of moral unease, but the film\'s intense entertainment value cannot be denied. This action-packed drama outshines even the "John Wick" series in terms of thrilling, high-octane action.',
                director_name: "Jalmari-Helander",
                release_date: "2023-02-28 00:00:00",
            },
            {
                movie_name: "Chevalier",
                description: "Chevalier is a English movie released on 21 Apr, 2023. The movie is directed by Stephen Williams and featured Kelvin Harrison Jr., Samara Weaving, Lucy Boynton and Marton Csokas as lead characters. Other popular actor who was roped in for Chevalier is Minnie Driver.",
                director_name: "Stephen-Williams",
                release_date: "2022-01-28 00:00:00",
            },
            {
                movie_name: "The Inspectionsc ",
                description: "The story commences in 2005, centering around Ellis French, a gay African American man. At the age of 25, Ellis had already been living independently for some time, having become estranged from his mother due to her religious beliefs that did not accept his sexuality. After struggling to succeed in various endeavours and finding himself on the brink of drug addiction and loneliness, Ellis decides to enlist in the Marines and enrolls in a boot camp.",
                director_name: "Elegance-Bratton",
                release_date: "2022-08-22 00:00:00",
            },
            {
                movie_name: "Renfield",
                description: "manipulate and destroy people, physically and mentally. One of his victims is Renfield, who has been mindlessly serving blood to his boss as he temporarily transforms into a killing machine. But he wants out after his chance encounter with an honest cop Rebecca Quincy (Awkwafina), who is nursing her old wounds. Together, they are up for some real trouble and a lot of violence.",
                director_name: "Chris-McKay",
                release_date: "2022-10-22 00:00:00",
            },
            {
                movie_name: "Marlowe",
                description: "Set in 1939 Los Angeles, Rich heiress Clare Cavendish engages private investigator Phillip Marlowe to look into the disappearance of Nico, her ex-lover. The wealthy heiress tells the detective that she has seen him and is still very much alive, despite the fact that the majority of people think he is dead. When Marlowe meets people like Floyd Hanson, the manager of Corbata Club, Nico’s sister, and Lou Hendricks, a drug dealer, his subsequent investigations send him spiraling into a vortex of mystery.",
                director_name: "Neil-Jordan",
                release_date: "2023-01-12 00:00:00",
            },
        ],
        skipDuplicates: true,
    });
    // await prisma.user.deleteMany();
    console.log(user);
    console.log("Hpoo");
}
main()
    .catch((e) => {
    console.log(e.message);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=script.js.map