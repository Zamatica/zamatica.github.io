

class Button {
    constructor(clickCallback, text) {
        this.button = $(document.createElement("button"));

        this.button.addClass('btn btn-primary');

        this.button.text(text);

        this.button.on('click', () => {
            clickCallback();
        });
    }


    element() {
        return this.button;
    }
}


class Sound {
    constructor(name, file) {
        this.sound = new Audio(file);

        this.button = new Button(() => {
            this.play();
        }, name);
    }


    element() {
        return this.button.element();
    }


    play() {
        this.sound.play();
    }
}


class SoundBoard {
    constructor(SoundFiles, id, opts = undefined) {
        this.id = id;
        this.sounds = {};

        this.options = opts || {
            ColumnCount: 4
        };

        function extractName(file) {
            return file.substring(file.lastIndexOf("s/") + 2, file.lastIndexOf('.mp3'))
        }

        SoundFiles.forEach((sound) => {
            if (sound.title) {
                this.sounds[sound.file] = new Sound(sound.title, sound.file);
            } else {
                this.sounds[sound] = new Sound(extractName(sound), sound);
            }
        });
    }


    renderBoard() {
        var table = $(this.id)
        table.children().empty();
        var soundRow = $(document.createElement('tr'));

        Object.keys(this.sounds).forEach((file, index) => {
            var data = $(document.createElement('td'));
            data.append(this.sounds[file].element());

            soundRow.append(data);
            
            if ((index + 1) % this.options.ColumnCount == 0) {
                table.append(soundRow);
                soundRow = $(document.createElement('tr'));

            } else if ((SoundFiles.length - index) % this.options.ColumnCount != 0) {
                table.append(soundRow);
            }
        });
    }
}

