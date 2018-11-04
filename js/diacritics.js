//https://github.com/andrewrk/node-diacritics

var replacementList = [
    {
        base: 'a',
        chars: "\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250\u0251",
    }, {
        base: 'aa',
        chars: "\uA733",
    }, {
        base: 'ae',
        chars: "\u00E6\u01FD\u01E3",
    }, {
        base: 'ao',
        chars: "\uA735",
    }, {
        base: 'au',
        chars: "\uA737",
    }, {
        base: 'av',
        chars: "\uA739\uA73B",
    }, {
        base: 'ay',
        chars: "\uA73D",
    }, {
        base: 'b',
        chars: "\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253\u0182",
    }, {
        base: 'c',
        chars: "\uFF43\u24D2\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184",
    }, {
        base: 'd',
        chars: "\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\u018B\u13E7\u0501\uA7AA",
    }, {
        base: 'dh',
        chars: "\u00F0",
    }, {
        base: 'dz',
        chars: "\u01F3\u01C6",
    }, {
        base: 'e',
        chars: "\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u01DD",
    }, {
        base: 'f',
        chars: "\u24D5\uFF46\u1E1F\u0192",
    }, {
        base: 'ff',
        chars: "\uFB00",
    }, {
        base: 'fi',
        chars: "\uFB01",
    }, {
        base: 'fl',
        chars: "\uFB02",
    }, {
        base: 'ffi',
        chars: "\uFB03",
    }, {
        base: 'ffl',
        chars: "\uFB04",
    }, {
        base: 'g',
        chars: "\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\uA77F\u1D79",
    }, {
        base: 'h',
        chars: "\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265",
    }, {
        base: 'hv',
        chars: "\u0195",
    }, {
        base: 'i',
        chars: "\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131",
    }, {
        base: 'j',
        chars: "\u24D9\uFF4A\u0135\u01F0\u0249",
    }, {
        base: 'k',
        chars: "\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3",
    }, {
        base: 'l',
        chars: "\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747\u026D",
    }, {
        base: 'lj',
        chars: "\u01C9",
    }, {
        base: 'm',
        chars: "\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F",
    }, {
        base: 'n',
        chars: "\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u043B\u0509",
    }, {
        base: 'nj',
        chars: "\u01CC",
    }, {
        base: 'o',
        chars: "\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\uA74B\uA74D\u0275\u0254\u1D11",
    }, {
        base: 'oe',
        chars: "\u0153",
    }, {
        base: 'oi',
        chars: "\u01A3",
    }, {
        base: 'oo',
        chars: "\uA74F",
    }, {
        base: 'ou',
        chars: "\u0223",
    }, {
        base: 'p',
        chars: "\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755\u03C1",
    }, {
        base: 'q',
        chars: "\u24E0\uFF51\u024B\uA757\uA759",
    }, {
        base: 'r',
        chars: "\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783",
    }, {
        base: 's',
        chars: "\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u0282",
    }, {
        base: 'ss',
        chars: "\xDF",
    }, {
        base: 't',
        chars: "\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787",
    }, {
        base: 'th',
        chars: "\u00FE",
    }, {
        base: 'tz',
        chars: "\uA729",
    }, {
        base: 'u',
        chars: "\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289",
    }, {
        base: 'v',
        chars: "\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C",
    }, {
        base: 'vy',
        chars: "\uA761",
    }, {
        base: 'w',
        chars: "\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73",
    }, {
        base: 'x',
        chars: "\u24E7\uFF58\u1E8B\u1E8D",
    }, {
        base: 'y',
        chars: "\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF",
    }, {
        base: 'z',
        chars: "\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763",
    }
];

var diacriticsMap = {};
for (var i = 0; i < replacementList.length; i += 1) {
    var chars = replacementList[i].chars;
    for (var j = 0; j < chars.length; j += 1) {
        diacriticsMap[chars[j]] = replacementList[i].base;
    }
}

function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007e]/g, function(c) {
        return diacriticsMap[c] || c;
    });
}