import { makeScene2D } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";
import {
  CodeBlock,
  insert,
  edit,
  remove,
} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const code = createRef<CodeBlock>();

  yield* view.add(
    <CodeBlock
      ref={code}
      language="java"
      code={`
public class Main {
  public static void main(String[] args) {
    System.out.println("The result is: " + (5 + 10));
  }
}`}
    />
  );

  yield* waitFor(0.5);

  yield* code().edit(1)`
public class Main {
  public static void main(String[] args) {${insert(
    "\n    int result = 5 + 10;"
  )}
    System.out.println("The result is: " + ${edit("(5 + 10)", "result")});
  }
}`;

  yield* waitFor(0.5);

  yield* code().edit(1)`
public class Main {
  public static void main(String[] args) {${insert(
    `\n    AbstractAdder adder = new AbstractAdder() {
      @Override
      public int add( int a, int b ) {
        return a + b
      }
    }`
  )}
    int result = ${edit("5 + 10", "adder.add(5,10)")};
    System.out.println("The result is: " + result);
  }
}${insert(`

abstract class AbstractAdder {
  @Override
  public abstract int add( int a, int b );
}`)}`;

  yield* code().fontSize(30, 1);

  yield* code().edit(1)`
public class Main {
  public static void main(String[] args) {
    AbstractAdder adder = new AbstractAdder() {
      @Override
      public int add( int a, int b ) {
        return a + b
      }
    };
    int result = adder.add(5,10);
    System.out.println("The result is: " + result);
  }
}

abstract class AbstractAdder ${insert("implements AdderInterface ")}{
  @Override
  public abstract int add( int a, int b );
}${insert(`

interface AdderInterface {
  int add(int a, int b)
}`)}`;

  yield* waitFor(5);
});
