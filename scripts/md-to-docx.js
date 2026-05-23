import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ExternalHyperlink, ShadingType
} from 'docx';

const mdPath = process.argv[2] || 'docs/landing-page-ownership-transfer.md';
const outPath = mdPath.replace(/\.md$/, '.docx');

const md = readFileSync(mdPath, 'utf8');
const tokens = marked.lexer(md);

function colorHex(hex) {
  return hex.replace('#', '');
}

const BRAND = {
  heading1: '1a1a2e',
  heading2: '067FAE',
  heading3: '055e82',
  accent: '2AB27B',
  muted: '6b7280',
  tablehead: '0d1b2a',
  tableheadfg: 'ffffff',
  tablealt: 'f8fafc',
};

function makeHyperlink(text, url) {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text,
        style: 'Hyperlink',
        color: colorHex('#067FAE'),
      }),
    ],
  });
}

function parseInline(text) {
  // Returns array of TextRun / ExternalHyperlink
  const runs = [];
  // Patterns: **bold**, *italic*, [text](url), plain
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|`(.+?)`|(.+?(?=\*\*|\[|`|$))/gs;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[0] === '') continue;
    if (match[1] !== undefined) {
      runs.push(new TextRun({ text: match[1], bold: true }));
    } else if (match[2] !== undefined) {
      runs.push(makeHyperlink(match[2], match[3]));
    } else if (match[4] !== undefined) {
      runs.push(new TextRun({ text: match[4], font: 'Courier New', size: 18 }));
    } else if (match[5] !== undefined && match[5].trim()) {
      runs.push(new TextRun({ text: match[5] }));
    }
  }
  return runs.length ? runs : [new TextRun({ text })];
}

function ruleParagraph() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: colorHex('#e5e7eb') } },
    spacing: { after: 160 },
  });
}

function blockquoteParagraph(text) {
  const lines = text.split('\n').filter(Boolean);
  return lines.map(line => new Paragraph({
    children: parseInline(line.replace(/^\*\*(.+?)\*\*/, '$1')),
    indent: { left: 720 },
    spacing: { after: 80 },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'f0f9ff' },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: colorHex('#067FAE') },
    },
    style: 'Normal',
  }));
}

const docChildren = [];
let inBlockquote = false;

for (const token of tokens) {
  if (token.type === 'heading') {
    const level = token.depth;
    docChildren.push(new Paragraph({
      children: [new TextRun({
        text: token.text.replace(/\*\*/g, ''),
        bold: true,
        color: level === 1 ? colorHex('#1a1a2e') : level === 2 ? colorHex('#067FAE') : colorHex('#055e82'),
        size: level === 1 ? 40 : level === 2 ? 30 : 24,
      })],
      heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
      spacing: { before: level === 1 ? 0 : 320, after: 160 },
    }));
  } else if (token.type === 'paragraph') {
    docChildren.push(new Paragraph({
      children: parseInline(token.text),
      spacing: { after: 160 },
    }));
  } else if (token.type === 'blockquote') {
    const inner = token.text || (token.tokens?.[0]?.text ?? '');
    blockquoteParagraph(inner).forEach(p => docChildren.push(p));
    docChildren.push(new Paragraph({ spacing: { after: 80 } }));
  } else if (token.type === 'list') {
    for (const item of token.items) {
      const itemText = item.text;
      if (token.ordered) {
        docChildren.push(new Paragraph({
          children: parseInline(itemText),
          numbering: { reference: 'ordered-list', level: 0 },
          spacing: { after: 80 },
        }));
      } else {
        docChildren.push(new Paragraph({
          children: parseInline(itemText),
          bullet: { level: 0 },
          spacing: { after: 80 },
        }));
      }
    }
    docChildren.push(new Paragraph({ spacing: { after: 80 } }));
  } else if (token.type === 'table') {
    const rows = [];
    // Header row
    rows.push(new TableRow({
      tableHeader: true,
      children: token.header.map(cell => new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text: cell.text, bold: true, color: colorHex('#ffffff'), size: 18 })],
          alignment: AlignmentType.CENTER,
        })],
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: colorHex('#0d1b2a') },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
      })),
    }));
    // Body rows
    token.rows.forEach((row, ri) => {
      rows.push(new TableRow({
        children: row.map((cell, ci) => new TableCell({
          children: [new Paragraph({
            children: parseInline(cell.text),
            alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
          })],
          shading: ri % 2 === 1
            ? { type: ShadingType.CLEAR, color: 'auto', fill: colorHex('#f8fafc') }
            : undefined,
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
        })),
      }));
    });
    docChildren.push(new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    }));
    docChildren.push(new Paragraph({ spacing: { after: 200 } }));
  } else if (token.type === 'hr') {
    docChildren.push(ruleParagraph());
  } else if (token.type === 'space') {
    docChildren.push(new Paragraph({ spacing: { after: 80 } }));
  }
}

const doc = new Document({
  numbering: {
    config: [{
      reference: 'ordered-list',
      levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT }],
    }],
  },
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: '2d2d2d' },
        paragraph: { spacing: { line: 320 } },
      },
    },
  },
  sections: [{ children: docChildren }],
});

Packer.toBuffer(doc).then(buf => {
  writeFileSync(outPath, buf);
  console.log(`✓ Written: ${outPath}`);
});
