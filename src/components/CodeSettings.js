import React from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import {
  OUTPUT_PAGE,
  OUTPUT_CONSOLE,
  OUTPUT_BOTH,
  OUTPUT_NONE,
} from '../actions/session';

import * as MODES from '../lib/cm-modes';

export default class CodeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.changeSource = this.changeSource.bind(this);
    this.changeOutput = this.changeOutput.bind(this);
    this.state = { height: 0 };
  }

  changeOutput(e) {
    this.props.changeOutput(e.target.value);
  }

  changeSource(e) {
    this.props.setSource(e.target.value);
  }

  render() {
    const { updated, lineWrapping, lineNumbers, source, output } = this.props;
    return (
      <div className="CodeSettings">
        <label className="select">
          Source{' '}
          <select value={source} onChange={this.changeSource}>
            <option value={MODES.HTML}>HTML</option>
            <option value={MODES.CSS}>CSS</option>
            <option value={MODES.JAVASCRIPT}>JavaScript</option>
          </select>
        </label>
        <label className="output select">
          Output{' '}
          <select value={output} onChange={this.changeOutput}>
            <option value={OUTPUT_PAGE}>Page</option>
            <option value={OUTPUT_CONSOLE}>Console</option>
            <option value={OUTPUT_BOTH}>Both</option>
            <option value={OUTPUT_NONE}>None</option>
          </select>
        </label>
        <details>
          <summary>Quick Settings</summary>

          <label>
            <input
              type="checkbox"
              onChange={e => {
                this.props.set('lineWrapping', e.target.checked);
              }}
              checked={lineWrapping}
            />{' '}
            Line wrap
          </label>

          <label>
            <input
              type="checkbox"
              onChange={e => {
                this.props.set('lineNumbers', e.target.checked);
              }}
              checked={lineNumbers}
            />{' '}
            Line numbers
          </label>
        </details>

        {updated &&
          `Last saved: ${distanceInWordsToNow(updated, {
            includeSeconds: true,
          })}`}
      </div>
    );
  }
}

CodeSettings.propTypes = {
  toggleOutput: PropTypes.func,
  output: PropTypes.string,
  set: PropTypes.func,
  updated: PropTypes.string,
  lineWrapping: PropTypes.bool.isRequired,
  lineNumbers: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  setSource: PropTypes.func,
  changeOutput: PropTypes.func,
  onRefresh: PropTypes.func,
};