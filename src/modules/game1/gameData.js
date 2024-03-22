const missingWords = ["elsket", "enbårne", "tapt", "kamel", "nåløye", "rik", "Guds rike", "begynnelsen", "Gud", "elske", "kjærligheten", "elsker", "kjenner", "lykt", "lys", "vakker", "vett", "gullring", "dronningskrud", "slottsgården", "kongens"];

const bibleText = [
  {
    id: 1,
    text: (
      <span>
        <i>Joh.3,16:</i>For så høyt har Gud
      </span>
    ),
    droppableId: "elsket",
  },
  {
    id: 2,
    text: "verden at han ga sin sønn, den",
    droppableId: "enbårne",
  },
  {
    id: 3,
    text: "for at hver den som tror på ham ikke skal gå",
    droppableId: "tapt",
  },
  {
    id: 4,
    text: "men ha evig liv.",
  },
  {
    id: 5,
    lineBrake: true,
    text: (
      <span>
        <i>Mark 10,25:</i> Det er lettere for en
      </span>
    ),
    droppableId: "kamel",
  },
  {
    id: 6,
    text: "å gå gjennom et ",
    droppableId: "nåløye",
  },
  {
    id: 7,
    text: "enn for en",
    droppableId: "rik",
  },
  {
    id: 8,
    text: "å komme inn i",
    droppableId: "Guds rike",
  },
  {
    id: 9,
    lineBrake: true,
    text: (
      <span>
        <i>1.mosebok 1:</i> I
      </span>
    ),
    droppableId: "begynnelsen",
  },
  {
    id: 10,
    text: "skapte",
    droppableId: "Gud",
  },
  {
    id: 11,
    text: "himmelen og jorden.",
  },
  {
    id: 12,
    lineBrake: true,
    text: (
      <span>
        <i>1.Joh 4,7:</i> Mine kjære, la oss
      </span>
    ),
    droppableId: "elske",
  },
  {
    id: 13,
    text: "hverandre. For",
    droppableId: "kjærligheten",
  },
  {
    id: 14,
    text: "er fra Gud, og hver den som",
    droppableId: "elsker",
  },
  {
    id: 15,
    text: "er født av Gud og",
    droppableId: "kjenner",
  },
  {
    id: 16,
    text: "Gud",
  },
  {
    id: 17,
    lineBrake: true,
    text: (
      <span>
        <i>Sal 119, 105:</i> Ditt ord er en
      </span>
    ),
    droppableId: "lykt",
  },
  {
    id: 18,
    text: "for min fot og et",
    droppableId: "lys",
  },
  {
    id: 19,
    text: "for min sti»",
  },
  {
    id: 20,
    text: (
      <span>
        <i>Ordspråkene 11,22:</i> En,
      </span>
    ),
    lineBrake: true,

    droppableId: "vakker",
  },
  {
    id: 21,
    text: "kvinne uten",
    droppableId: "vett",
  },
  {
    id: 22,
    text: "er som en",
    droppableId: "gullring",
  },
  {
    id: 23,
    text: "i et grisetryne",
  },
  {
    id: 24,
    lineBrake: true,

    text: (
      <span>
        <i>Ester 5,1:</i> Den tredje dagen kledte Ester seg i
      </span>
    ),
    droppableId: "dronningskrud",
  },
  {
    id: 25,
    text: "og stilte seg i den indre",
    droppableId: "slottsgården",
  },
  {
    id: 26,
    text: "midt imot",
    droppableId: "kongens",
  },
  {
    id: 27,
    text: "hus",
  },
];

export { missingWords, bibleText };
