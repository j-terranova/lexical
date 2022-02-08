/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {$isRootNode, $getRoot, $createParagraphNode} from 'lexical';
import {$createRootNode} from '../../LexicalRootNode';
import {
  $createTestDecoratorNode,
  initializeUnitTest,
} from '../../../../__tests__/utils';

describe('LexicalRootNode tests', () => {
  initializeUnitTest((testEnv) => {
    let rootNode;

    beforeEach(async () => {
      const {editor} = testEnv;
      await editor.update(() => {
        rootNode = $createRootNode();
      });
    });

    test('RootNode.constructor', async () => {
      const {editor} = testEnv;
      await editor.update(() => {
        expect(rootNode).toStrictEqual($createRootNode());
        expect(rootNode.getType()).toBe('root');
        expect(rootNode.getTextContent()).toBe('');
      });
    });

    test('RootNode.clone()', async () => {
      const rootNodeClone = rootNode.constructor.clone();
      expect(rootNodeClone).not.toBe(rootNode);
      expect(rootNodeClone).toStrictEqual(rootNode);
    });

    test('RootNode.createDOM()', async () => {
      expect(() => rootNode.createDOM()).toThrow();
    });

    test('RootNode.updateDOM()', async () => {
      expect(rootNode.updateDOM()).toBe(false);
    });

    test('RootNode.isAttached()', async () => {
      expect(rootNode.isAttached()).toBe(true);
    });

    test('RootNode.isRootNode()', () => {
      expect($isRootNode(rootNode)).toBe(true);
    });

    test('Cached getTextContent with decorators', async () => {
      const {editor} = testEnv;
      await editor.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        paragraph.append($createTestDecoratorNode());
      });
      expect(
        editor.getEditorState().read(() => {
          return $getRoot().getTextContent();
        }),
      ).toBe('Hello world');
    });
  });
});