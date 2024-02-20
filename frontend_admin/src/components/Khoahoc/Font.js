// FontColor.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import icon from '@ckeditor/ckeditor5-font/src/fontcolor/icons/fontcolor.svg';

export default class FontColor extends Plugin {
    static get pluginName() {
        return 'FontColor';
    }

    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('fontColor', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Font Color',
                icon: icon,
                tooltip: true
            });

            // Execute the command when the button is clicked
            view.on('execute', () => {
                editor.execute('fontColor');
            });

            return view;
        });
    }
}
