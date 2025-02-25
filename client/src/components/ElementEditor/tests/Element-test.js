/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { Component as Element } from '../Element';
import { render } from '@testing-library/react';

function makeProps(obj = {}) {
  return {
    element: {
      id: '2',
      title: 'Block Title',
      blockSchema: {
        actions: {
          edit: 'admin/pages/edit/EditForm/7/field/ElementalArea/item/2/edit?stage=Stage'
        },
        content: 'Block Content',
        iconClass: 'font-icon-block-content',
        type: 'Content'
      },
      inlineEditable: true,
      isLiveVersion: true,
      isPublished: true,
    },
    areaId: 1,
    type: {
      icon: 'font-icon-block-content',
      title: 'Content'
    },
    link: 'admin/pages/edit/EditForm/7/field/ElementalArea/item/2/edit?stage=Stage',
    HeaderComponent: () => <div className="test-header" />,
    ContentComponent: () => <div className="test-content" />,
    connectDragSource: (el) => el,
    connectDragPreview: (el) => el,
    connectDropTarget: (el) => el,
    isDragging: false,
    isOver: false,
    ...obj,
  };
}

test('Element should render the HeaderComponent and the ContentComponent', () => {
  const { container } = render(<Element {...makeProps()}/>);
  expect(container.querySelector('.element-editor__element .test-header')).not.toBeNull();
  expect(container.querySelector('.element-editor__element .test-content')).not.toBeNull();
});

test('Element should render null if no ID is given', () => {
  const { container } = render(
    <Element {...makeProps({
      element: {
        ...makeProps().element,
        id: ''
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor__element .test-header')).toBeNull();
  expect(container.querySelector('.element-editor__element .test-content')).toBeNull();
});

test('Element should render even if the element is broken', () => {
  const { container } = render(
    <Element {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor__element .test-header')).not.toBeNull();
  expect(container.querySelector('.element-editor__element .test-content')).not.toBeNull();
});

test('Element getVersionedStateClassName() should identify draft elements', () => {
  const { container } = render(
    <Element {...makeProps({
      element: {
        ...makeProps().element,
        isPublished: false
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor__element--draft')).not.toBeNull();
});

test('Element getVersionedStateClassName() should identify modified elements', () => {
  const { container } = render(
    <Element {...makeProps({
      element: {
        ...makeProps().element,
        isPublished: true,
        isLiveVersion: false
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor__element--modified')).not.toBeNull();
});

test('Element getVersionedStateClassName() should identify published elements', () => {
  const { container } = render(
    <Element {...makeProps({
      element: {
        ...makeProps().element,
        isPublished: true,
        isLiveVersion: true
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor__element--published')).not.toBeNull();
});
