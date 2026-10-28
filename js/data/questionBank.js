/**
 * Curated Question Bank for Rigorous 5-Question Skill Assessments
 * Tests conceptual understanding, algorithmic complexity, architectural tradeoffs, and reasoning.
 */

export const QUESTION_BANK = {
  'Data Structures & Algorithms': [
    {
      id: 'dsa_1',
      question: 'You need to implement an LRU (Least Recently Used) cache with O(1) time complexity for both `get` and `put` operations. Which combination of data structures is optimal?',
      options: [
        'A singly linked list paired with a binary search tree',
        'A doubly linked list paired with a hash map',
        'A min-heap paired with an array',
        'A circular queue paired with a balanced AVL tree'
      ],
      correctIndex: 1,
      explanation: 'A doubly linked list allows O(1) removal and insertion of nodes at both ends, while a hash map provides O(1) key-to-node lookups, satisfying the O(1) requirement for both get and put.',
      topic: 'Data Structure Selection'
    },
    {
      id: 'dsa_2',
      question: 'What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST) containing N elements?',
      options: [
        'O(log N)',
        'O(1)',
        'O(N)',
        'O(N log N)'
      ],
      correctIndex: 2,
      explanation: 'When a BST is completely unbalanced (e.g., elements inserted in sorted order), it degrades into a linear chain (linked list), yielding O(N) worst-case search complexity.',
      topic: 'Algorithmic Complexity'
    },
    {
      id: 'dsa_3',
      question: 'In an unweighted graph where you must find the shortest path between two nodes, which traversal algorithm should you use?',
      options: [
        'Breadth-First Search (BFS)',
        'Depth-First Search (DFS)',
        'Topological Sort',
        'Prim’s Algorithm'
      ],
      correctIndex: 0,
      explanation: 'BFS explores nodes layer by layer (by distance from start), guaranteeing the first time the target node is visited corresponds to the shortest path in an unweighted graph.',
      topic: 'Graph Algorithms'
    },
    {
      id: 'dsa_4',
      question: 'Consider the recurrence relation T(n) = 2T(n/2) + O(n). According to the Master Theorem, what is the asymptotic runtime?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n^2)',
        'O(2^n)'
      ],
      correctIndex: 1,
      explanation: 'Here a=2, b=2, and f(n)=O(n). Since log_b(a) = log_2(2) = 1, f(n) matches n^(log_b(a)). By Case 2 of the Master Theorem, T(n) = O(n log n) (classic Merge Sort complexity).',
      topic: 'Recurrence & Complexity'
    },
    {
      id: 'dsa_5',
      question: 'Which collision resolution strategy in hash tables links colliding elements into a separate chain located outside the primary bucket array?',
      options: [
        'Linear Probing',
        'Quadratic Probing',
        'Separate Chaining',
        'Double Hashing'
      ],
      correctIndex: 2,
      explanation: 'Separate Chaining maintains an independent linked list or tree at each bucket index, storing colliding key-value pairs without occupying subsequent slots in the main array table.',
      topic: 'Hash Structures'
    }
  ],

  'Python': [
    {
      id: 'py_1',
      question: 'What is the primary difference between a Python list and a Python generator expression regarding memory consumption?',
      options: [
        'Generators store all items in RAM immediately, while lists are stored on disk',
        'Lists compute and store all elements in memory eagerly, while generators yield items lazily on demand',
        'Lists are immutable sequences, while generators can be mutated in-place',
        'There is no memory difference; generator is simply syntactic sugar for a list comprehension'
      ],
      correctIndex: 1,
      explanation: 'Lists allocate memory for all elements upfront, whereas generators use lazy evaluation (the iterator protocol) to generate one element at a time, resulting in O(1) auxiliary memory.',
      topic: 'Memory & Iteration'
    },
    {
      id: 'py_2',
      question: 'In Python, why is using a mutable default argument like `def append_item(x, items=[])` considered an anti-pattern?',
      options: [
        'Python raises a SyntaxError at compile time for mutable parameters',
        'The default list is instantiated only once when the function is defined, causing it to persist across multiple calls',
        'Default arguments in Python are strictly read-only and will raise an AttributeError on mutation',
        'It causes memory leaks by disabling garbage collection for all local variables'
      ],
      correctIndex: 1,
      explanation: 'Python evaluates default parameter expressions once at function definition time. Subsequent invocations without the argument reuse the exact same mutable object instance.',
      topic: 'Function Scope & Mutability'
    },
    {
      id: 'py_3',
      question: 'What is the purpose of the Global Interpreter Lock (GIL) in CPython?',
      options: [
        'To prevent race conditions inside user application code without locks',
        'To synchronize memory management and keep CPython memory thread-safe by allowing only one native thread to execute Python bytecode at a time',
        'To accelerate multi-threaded mathematical computations on multi-core CPUs',
        'To sandbox file system access and enforce permissions'
      ],
      correctIndex: 1,
      explanation: 'The GIL is a mutex that protects CPython internal data structures and reference-counting memory management from concurrent access, meaning CPU-bound threads cannot execute Python bytecode simultaneously.',
      topic: 'CPython Internals'
    },
    {
      id: 'py_4',
      question: 'What does the `@functools.wraps(fn)` decorator preserve when authoring a custom function decorator?',
      options: [
        'The execution time of the wrapped function',
        'The original function’s metadata including `__name__`, `__doc__`, and parameter signatures',
        'The global namespace variables accessed by the function',
        'The return type annotations by converting them to runtime assertions'
      ],
      correctIndex: 1,
      explanation: 'Without @wraps, the decorated function inherits the name and docstring of the inner wrapper closure. @wraps copies the original function attributes so debugging and introspection work correctly.',
      topic: 'Decorators & Introspection'
    },
    {
      id: 'py_5',
      question: 'Which built-in module provides fast, C-optimized doubly linked deques and counter abstractions?',
      options: [
        'itertools',
        'collections',
        'functools',
        'dataclasses'
      ],
      correctIndex: 1,
      explanation: 'The `collections` module provides specialized container datatypes including `deque` (O(1) appends and pops from both ends), `Counter`, `defaultdict`, and `OrderedDict`.',
      topic: 'Standard Library'
    }
  ],

  'Problem Solving': [
    {
      id: 'ps_1',
      question: 'You must find two numbers in a sorted array that sum to a target value S in O(N) time and O(1) extra space. Which technique is most appropriate?',
      options: [
        'Nested two-level brute force search',
        'Two pointers initialized at opposite ends moving inward based on comparison with S',
        'Hash table lookup storing all previously seen complements',
        'Binary search on every possible pair combination'
      ],
      correctIndex: 1,
      explanation: 'Because the array is already sorted, two pointers starting at index 0 and index N-1 can move inward monotonically in O(N) time with strictly O(1) auxiliary space.',
      topic: 'Pattern Recognition'
    },
    {
      id: 'ps_2',
      question: 'When an optimization problem exhibits overlapping subproblems and optimal substructure, which technique should be evaluated first?',
      options: [
        'Greedy heuristic search without backtracking',
        'Dynamic Programming (memoization or tabulation)',
        'Monte Carlo random sampling',
        'Breadth-First Search with an unbounded queue'
      ],
      correctIndex: 1,
      explanation: 'Overlapping subproblems and optimal substructure are the two defining mathematical prerequisites for applying Dynamic Programming efficiently.',
      topic: 'Algorithmic Paradigms'
    },
    {
      id: 'ps_3',
      question: 'You need to find the median of a continuous real-time data stream of numbers. Which approach provides O(log N) insertion and O(1) median retrieval?',
      options: [
        'Re-sorting the array with QuickSort after each incoming number',
        'Maintaining two heaps: a max-heap for the lower half and a min-heap for the upper half',
        'Using a circular buffer of fixed size 1000',
        'Storing values in a hash set keyed by timestamp'
      ],
      correctIndex: 1,
      explanation: 'Balancing a max-heap (for the lower half) and a min-heap (for the upper half) allows O(log N) push/pop and O(1) access to top elements to calculate the median directly.',
      topic: 'Streaming & Tradeoffs'
    },
    {
      id: 'ps_4',
      question: 'What is the primary risk of adopting a greedy algorithm without formal proof of greedy-choice property?',
      options: [
        'It will inevitably trigger a stack overflow error',
        'It may get trapped in a local optimum and fail to reach the global optimal solution',
        'It has an exponential worst-case time complexity O(2^N)',
        'It cannot be implemented with standard procedural loops'
      ],
      correctIndex: 1,
      explanation: 'Greedy algorithms make locally optimal choices at each step. Without the greedy-choice property and optimal substructure, locally optimal decisions do not guarantee a globally optimal outcome.',
      topic: 'Correctness & Proof'
    },
    {
      id: 'ps_5',
      question: 'In sliding window problems, what condition makes the sliding window technique particularly well-suited over brute-force recalculation?',
      options: [
        'The window content must be cleared and reallocated from scratch at every step',
        'The transition between adjacent windows can be calculated incrementally in O(1) by subtracting the departing element and adding the entering element',
        'The input array must contain exclusively negative floating point values',
        'The target window length must always be an odd prime number'
      ],
      correctIndex: 1,
      explanation: 'The efficiency of a sliding window relies on reusing computation from the overlapping range, adjusting state in O(1) as the window advances across the dataset.',
      topic: 'Optimization Patterns'
    }
  ],

  'C Programming': [
    {
      id: 'c_1',
      question: 'What happens when you allocate memory using `malloc(sizeof(int) * 10)` in C?',
      options: [
        'Memory is allocated on the stack and automatically cleared when exiting the function',
        'Contiguous heap memory is allocated without zero-initialization of bytes',
        'Contiguous heap memory is allocated and every byte is guaranteed to be set to 0x00',
        'A compile-time memory boundary is reserved in the program data segment'
      ],
      correctIndex: 1,
      explanation: '`malloc` reserves raw uninitialized heap memory. To obtain zero-initialized allocated memory, `calloc` must be used instead.',
      topic: 'Dynamic Memory Allocation'
    },
    {
      id: 'c_2',
      question: 'What is undefined behavior (UB) in the C standard?',
      options: [
        'A syntax error that halts compilation immediately',
        'Execution for which the standard imposes no requirements; the compiler may optimize assuming UB cannot occur',
        'A guaranteed runtime segmentation fault whenever the line is reached',
        'A warning emitted by standard ANSI C linters'
      ],
      correctIndex: 1,
      explanation: 'Undefined behavior means the C specification places no constraints on what may happen. The compiler is free to reorder, eliminate, or transform code under the premise that UB never occurs.',
      topic: 'Language Specification'
    },
    {
      id: 'c_3',
      question: 'Given `int arr[5] = {10, 20, 30, 40, 50}; int *p = arr;`, what is the value of `*(p + 2)`?',
      options: [
        '10',
        '20',
        '30',
        'Garbage pointer memory address'
      ],
      correctIndex: 2,
      explanation: 'Pointer arithmetic increments by units of the underlying type size (`sizeof(int)`). `*(p + 2)` dereferences index 2 of `arr`, which is 30.',
      topic: 'Pointers & Arrays'
    },
    {
      id: 'c_4',
      question: 'Why should the function `gets()` never be used in production C code?',
      options: [
        'It only accepts uppercase ASCII characters',
        'It does not perform buffer bounds checking and inevitably leads to buffer overflow vulnerabilities',
        'It is deprecated because it allocates dynamic memory on every call',
        'It requires POSIX threads to run'
      ],
      correctIndex: 1,
      explanation: '`gets()` has no parameter limiting input length, so user input exceeding the destination buffer writes past boundaries into adjacent memory, creating severe security exploits. `fgets()` should always be used.',
      topic: 'Security & I/O'
    },
    {
      id: 'c_5',
      question: 'What is the purpose of the `volatile` type qualifier in C?',
      options: [
        'It forces the variable to be stored exclusively in CPU registers for speed',
        'It informs the compiler that the variable value may change asynchronously (e.g. by hardware or an interrupt) so reads/writes must not be optimized away',
        'It marks the variable as thread-safe and adds an implicit mutex lock',
        'It declares the variable as constant and immutable across compilation units'
      ],
      correctIndex: 1,
      explanation: '`volatile` prevents the compiler from caching the variable in a register or optimizing away seemingly redundant reads/writes, critical for memory-mapped I/O and interrupt handlers.',
      topic: 'Type Qualifiers & Systems'
    }
  ],

  'Git/GitHub': [
    {
      id: 'git_1',
      question: 'What is the key architectural difference between `git merge feature` and `git rebase main`?',
      options: [
        'Merge deletes the feature branch commits, while rebase duplicates them',
        'Merge creates a new commit tying together histories with two parents; rebase rewrites project history by replaying feature commits on top of the target branch tip',
        'Rebase is safe on shared public branches, while merge should only be used locally',
        'Merge cannot resolve conflicts, whereas rebase resolves conflicts automatically'
      ],
      correctIndex: 1,
      explanation: 'Merge preserves exact non-linear chronology with a two-parent merge commit. Rebase linearizes history by reapplying commits onto a new base, changing their commit hashes.',
      topic: 'Version Control Workflows'
    },
    {
      id: 'git_2',
      question: 'You accidentally made local commits with sensitive credentials on an unpushed branch. Which command allows you to remove the commit cleanly before pushing?',
      options: [
        'git push --force-with-lease',
        'git reset --soft HEAD~1',
        'git checkout -b secrets',
        'git clean -fdx'
      ],
      correctIndex: 1,
      explanation: '`git reset --soft HEAD~1` moves HEAD back one commit while keeping the staged changes in your working index so you can redact the secrets and commit safely.',
      topic: 'History Management'
    },
    {
      id: 'git_3',
      question: 'What does a Git commit object fundamentally contain under the `.git/objects` directory?',
      options: [
        'Full line-by-line diffs of modified files relative to the initial repository commit',
        'A tree object SHA, parent commit SHAs, author/committer timestamps, and the commit log message',
        'A compiled binary executable of the repository',
        'An encrypted snapshot of the remote repository URL'
      ],
      correctIndex: 1,
      explanation: 'A commit object is a plain text file referencing the top-level tree SHA (which points to directory hierarchies and blob snapshots), parent commit hashes, author/committer metadata, and the message.',
      topic: 'Git Internals'
    },
    {
      id: 'git_4',
      question: 'What is the purpose of `.gitignore` file in a repository?',
      options: [
        'To instruct Git to ignore merge conflicts automatically during pull',
        'To tell Git untracked files or patterns (e.g. `node_modules/`, `.env`, build artifacts) that should intentionally remain untracked',
        'To encrypt repository secrets before pushing to GitHub',
        'To prevent unauthorized contributors from opening pull requests'
      ],
      correctIndex: 1,
      explanation: '`.gitignore` lists intentionally untracked patterns so build artifacts, sensitive keys, and temporary files are not staged or tracked in version history.',
      topic: 'Repository Hygiene'
    },
    {
      id: 'git_5',
      question: 'When resolving a complex merge conflict, what does `git diff --check` identify?',
      options: [
        'Syntax errors in JavaScript files',
        'Leftover conflict marker annotations (`<<<<<<<`, `=======`, `>>>>>>>`) and trailing whitespace errors',
        'Differences between your local branch and remote GitHub origin',
        'Commits authored by unauthorized users'
      ],
      correctIndex: 1,
      explanation: '`git diff --check` scans your working tree for unresolved conflict markers and whitespace anomalies before you finalize a merge commit.',
      topic: 'Conflict Resolution'
    }
  ],

  'SQL': [
    {
      id: 'sql_1',
      question: 'What is the fundamental difference between `WHERE` and `HAVING` clauses in SQL?',
      options: [
        '`WHERE` filters rows before grouping/aggregation; `HAVING` filters aggregated groups after the `GROUP BY` operation',
        '`WHERE` is only used with subqueries, while `HAVING` is used with joins',
        '`HAVING` performs full table scans, while `WHERE` always uses indexes',
        'There is no functional difference; they are interchangeable'
      ],
      correctIndex: 0,
      explanation: '`WHERE` filters individual records prior to aggregation. `HAVING` operates strictly on the summarized result sets produced by `GROUP BY`.',
      topic: 'Query Evaluation Order'
    },
    {
      id: 'sql_2',
      question: 'Which SQL window function assigns consecutive integer ranks without gaps when duplicate values occur in the order specification?',
      options: [
        'RANK()',
        'ROW_NUMBER()',
        'DENSE_RANK()',
        'NTILE()'
      ],
      correctIndex: 2,
      explanation: '`DENSE_RANK()` assigns identical ranks to tied rows, but unlike `RANK()`, it does not skip subsequent integers (e.g., 1, 2, 2, 3 instead of 1, 2, 2, 4).',
      topic: 'Window Functions'
    },
    {
      id: 'sql_3',
      question: 'In relational database theory, what does the "I" in ACID transactions ensure?',
      options: [
        'Indexing: queries are automatically indexed',
        'Isolation: concurrent transactions execute without interfering with one another’s uncommitted state',
        'Immutable: once written, historical logs cannot be mutated',
        'Idempotence: running a query multiple times yields identical results'
      ],
      correctIndex: 1,
      explanation: 'Isolation ensures that concurrent transactions operate independently, preventing phenomena like dirty reads, non-repeatable reads, or phantom reads depending on isolation level.',
      topic: 'Transaction Guarantees'
    },
    {
      id: 'sql_4',
      question: 'What is the primary performance tradeoff when creating secondary B-Tree indexes on frequently updated database tables?',
      options: [
        'Read queries become slower due to index overhead',
        'Read queries accelerate, but INSERT/UPDATE/DELETE operations incur overhead to maintain index trees and consume extra disk storage',
        'Foreign key constraints can no longer be enforced',
        'Database crashes become twice as frequent'
      ],
      correctIndex: 1,
      explanation: 'Secondary indexes provide fast pointer lookups for reads, but every mutation must update both the primary heap/clustered index and all associated secondary index trees.',
      topic: 'Indexing & Performance'
    },
    {
      id: 'sql_5',
      question: 'Which join type returns all rows from both tables, joining matches where available and filling NULLs on either side when unmatched?',
      options: [
        'LEFT OUTER JOIN',
        'CROSS JOIN',
        'FULL OUTER JOIN',
        'INNER JOIN'
      ],
      correctIndex: 2,
      explanation: 'FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins, returning all rows from both datasets with NULL padding where join conditions are not met.',
      topic: 'Relational Operations'
    }
  ]
};

/**
 * Returns available assessment skill names
 */
export function getAvailableAssessmentSkills() {
  return Object.keys(QUESTION_BANK);
}

/**
 * Helper to get questions for a skill or default to DSA/Problem Solving
 */
export function getQuestionsForSkill(skillName) {
  if (QUESTION_BANK[skillName]) {
    return QUESTION_BANK[skillName];
  }
  
  // Fuzzy match aliases
  const lower = skillName.toLowerCase();
  for (const [key, questions] of Object.entries(QUESTION_BANK)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return questions;
    }
  }

  // Fallback to Problem Solving
  return QUESTION_BANK['Problem Solving'];
}
