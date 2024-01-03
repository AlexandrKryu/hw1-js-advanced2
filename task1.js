
const musics = [
    { title: "Resist", artist: "Koshen", year: "2001" },
    { title: "Resistance", artist: "Alec Koff", year: "2020" },
    { title: "Back In Time", artist: "Perkele", year: "2022" }
];


const musicColections = {
    musics: [...musics],
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            next: () => {
                if (index < musics.length) {
                    return { value: this.musics[index++], done: false }
                } else {
                    return { done: true }
                }
            },
        };
    },
};

for (const music of musicColections) {
    console.log(`Исполнитель: ${music.artist} Альбома: ${music.title} ${music.year} года`);
}