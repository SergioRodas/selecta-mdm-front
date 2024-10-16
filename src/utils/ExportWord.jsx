import {
  Document,
  Packer,
  Paragraph,
  AlignmentType,
  HeadingLevel,
  Header,
  ImageRun,
  TextRun,
  TableCell,
  WidthType,
  BorderStyle,
  Table,
  TableRow,
  ExternalHyperlink,
  Footer,
} from 'docx';
import { saveAs } from 'file-saver';

import { logocydsa, Graphic } from '../assets/images';

export const handleExportWord = async (
  selectedDocument,
  currentDate,
  sectionsData,
  documentSettings,
  sectionSettings
) => {
  try {
    const response = await fetch(logocydsa);
    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    const responseGraphic = await fetch(Graphic);
    const imageBlobGraphic = await responseGraphic.blob();
    const imageBufferGraphic = await imageBlobGraphic.arrayBuffer();

    const documentName = selectedDocument
      ? selectedDocument.NOMBRE_DOCUMENTO
      : 'Documento';
    const fileName = `${documentName}_${currentDate}.docx`;
    const formatColor = (color) => color?.replace('#', '');

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 12240,
                height: 15840,
              },
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageBuffer,
                      transformation: {
                        width: 200,
                        height: 100,
                      },
                      floating: {
                        horizontalPosition: {
                          offset: 360000,
                        },
                        verticalPosition: {
                          offset: 360000,
                        },
                      },
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: selectedDocument
                        ? selectedDocument.NOMBRE_DOCUMENTO
                        : '',
                      font:
                        documentSettings?.documentStyles?.title.font || 'Arial',
                      size:
                        documentSettings?.documentStyles?.title.fontSize * 2 ||
                        24,
                      color: formatColor(
                        documentSettings?.documentStyles?.title.color
                      ),
                    }),
                  ],
                  heading: HeadingLevel.TITLE,
                  alignment:
                    documentSettings?.documentStyles?.title.position || 'rigth',
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: currentDate,
                      font: {
                        name: 'Arial',
                        size: 20,
                      },
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '\n',
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text:
                        'atencionaclientes@intelicast.net' +
                        ' | ' +
                        'Tel: (55)4627-4700',
                      font:
                        documentSettings?.documentStyles?.footer.font ||
                        'Arial',
                      size:
                        documentSettings?.documentStyles?.footer.fontSize * 2 ||
                        24,
                      color: formatColor(
                        documentSettings?.documentStyles?.footer.color
                      ),
                    }),
                  ],
                  alignment:
                    documentSettings?.documentStyles?.footer.position ||
                    'center',
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: '\n',
                }),
              ],
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBufferGraphic,
                  transformation: {
                    width: 720,
                    height: 300,
                  },
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '\n',
                }),
              ],
            }),

            ...sectionsData.flatMap((section) => {
              const { name: sectionName, notes } = section;

              const sectionStyle = sectionSettings.find(
                (style) => style.sectionId === section.id
              )?.styles?.styles;

              return [
                new Table({
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: sectionName.toUpperCase(),
                                  font: sectionStyle?.title?.font || 'Arial',
                                  size: sectionStyle?.title?.fontSize * 2 || 24,
                                  color: formatColor(
                                    sectionStyle?.title?.color
                                  ),
                                  bold: true,
                                }),
                              ],
                              indent: { left: 720 },
                              alignment: sectionStyle?.title?.position,
                            }),
                          ],
                          shading: {
                            fill:
                              formatColor(sectionStyle?.pleca?.color) ||
                              '4a90e2',
                          },
                        }),
                      ],
                    }),
                  ],
                  width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
                new Paragraph({
                  children: [new TextRun({ text: '\n' })],
                }),

                ...notes.flatMap((article) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: article.title || 'No reporto información',
                        font: sectionStyle?.title?.font || 'Arial',
                        size: sectionStyle?.title?.fontSize * 2 || 24,
                        bold: true,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: article.content,
                        font: sectionStyle?.content?.font || 'Arial',
                        size: sectionStyle?.content?.fontSize * 2 || 16,
                      }),
                      new TextRun({
                        text: article.medium,
                        font: sectionStyle?.witnesses?.font || 'Arial',
                        size: sectionStyle?.witnesses?.fontSize * 2 || 12,
                        color: formatColor(sectionStyle?.witnesses?.color),
                      }),

                      ...(article.medium && article.medium.length > 0
                        ? article.medium.flatMap((medio, indexMedio) =>
                            medio && article.urls[indexMedio]
                              ? [
                                  new TextRun({
                                    text: indexMedio > 0 ? ', ' : '',
                                    font:
                                      sectionStyle?.witnesses?.font || 'Arial',
                                    size:
                                      sectionStyle?.witnesses?.fontSize * 2 ||
                                      12,
                                    color: formatColor(
                                      sectionStyle?.witnesses?.color
                                    ),
                                  }),
                                  new ExternalHyperlink({
                                    children: [
                                      new TextRun({
                                        text: '(' + medio + ')',
                                        font:
                                          sectionStyle?.witnesses?.font ||
                                          'Arial',
                                        size:
                                          sectionStyle?.witnesses?.fontSize *
                                            2 || 12,
                                        color: formatColor(
                                          sectionStyle?.witnesses?.color
                                        ),
                                        underline: {},
                                      }),
                                    ],
                                    link: article.urls[indexMedio],
                                    indent: { left: 240 },
                                  }),
                                ]
                              : []
                          )
                        : [
                            new TextRun({
                              text: 'No se reporto información',
                              font: {
                                size: 28,
                                name: 'Arial',
                              },
                            }),
                          ]
                      ).flat(),
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: '\n' })],
                  }),
                ]),
              ];
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error al exportar el documento:', error);
  }
};
