let bars = [];
const barContainer = document.getElementById('bars');

// Generate random bars
function generateBars(num = 50) {
  barContainer.innerHTML = '';
  bars = [];
  for (let i = 0; i < num; i++) {
    const barHeight = Math.floor(Math.random() * 300) + 20;
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${barHeight}px`;
    bars.push(bar);
    barContainer.appendChild(bar);
  }
}

// Swap function for sorting algorithms
function swap(el1, el2) {
  const style1 = window.getComputedStyle(el1);
  const style2 = window.getComputedStyle(el2);

  const height1 = style1.getPropertyValue("height");
  const height2 = style2.getPropertyValue("height");

  el1.style.height = height2;
  el2.style.height = height1;
}

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].classList.add('active');
      bars[j + 1].classList.add('active');

      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        await new Promise(resolve => setTimeout(resolve, 100));
        swap(bars[j], bars[j + 1]);
      }

      bars[j].classList.remove('active');
      bars[j + 1].classList.remove('active');
    }
    bars[bars.length - i - 1].classList.add('sorted');
  }
}

// Insertion Sort
async function insertionSort() {
  for (let i = 1; i < bars.length; i++) {
    let j = i - 1;
    let key = bars[i].style.height;
    bars[i].classList.add('active');
    await new Promise(resolve => setTimeout(resolve, 100));
    while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
      bars[j + 1].style.height = bars[j].style.height;
      bars[j].classList.add('active');
      await new Promise(resolve => setTimeout(resolve, 100));
      bars[j].classList.remove('active');
      j--;
    }
    bars[j + 1].style.height = key;
    bars[i].classList.remove('active');
  }
  bars.forEach(bar => bar.classList.add('sorted'));
}

// Selection Sort
async function selectionSort() {
  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    bars[minIdx].classList.add('active');
    for (let j = i + 1; j < bars.length; j++) {
      bars[j].classList.add('active');
      if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
        bars[minIdx].classList.remove('active');
        minIdx = j;
        bars[minIdx].classList.add('active');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      bars[j].classList.remove('active');
    }
    if (minIdx !== i) {
      swap(bars[i], bars[minIdx]);
    }
    bars[minIdx].classList.remove('active');
    bars[i].classList.add('sorted');
  }
}

// Merge Sort
async function mergeSortHelper(arr, l, r) {
  if (l >= r) {
    return;
  }
  let m = l + Math.floor((r - l) / 2);
  await mergeSortHelper(arr, l, m);
  await mergeSortHelper(arr, m + 1, r);
  await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++) left[i] = arr[l + i];
  for (let j = 0; j < n2; j++) right[j] = arr[m + 1 + j];

  let i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (parseInt(left[i].style.height) <= parseInt(right[j].style.height)) {
      arr[k].style.height = left[i].style.height;
      i++;
    } else {
      arr[k].style.height = right[j].style.height;
      j++;
    }
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  while (i < n1) {
    arr[k].style.height = left[i].style.height;
    i++;
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  while (j < n2) {
    arr[k].style.height = right[j].style.height;
    j++;
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function mergeSort() {
  await mergeSortHelper(bars, 0, bars.length - 1);
  bars.forEach(bar => bar.classList.add('sorted'));
}

// Quick Sort
async function quickSortHelper(arr, low, high) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSortHelper(arr, low, pi - 1);
    await quickSortHelper(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  pivot.classList.add('active');
  let i = low - 1;

  for (let j = low; j < high; j++) {
    arr[j].classList.add('active');
    if (parseInt(arr[j].style.height) < parseInt(pivot.style.height)) {
      i++;
      await new Promise(resolve => setTimeout(resolve, 100));
      swap(arr[i], arr[j]);
    }
    arr[j].classList.remove('active');
  }
  await new Promise(resolve => setTimeout(resolve, 100));
  swap(arr[i + 1], arr[high]);
  pivot.classList.remove('active');
  arr[i + 1].classList.add('sorted');
  return i + 1;
}

async function quickSort() {
  await quickSortHelper(bars, 0, bars.length - 1);
  bars.forEach(bar => bar.classList.add('sorted'));
}

// Start the selected sorting algorithm
function startSorting() {
  const selectedAlgorithm = document.getElementById('algorithm').value;
  switch (selectedAlgorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'insertion':
      insertionSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'merge':
      mergeSort();
      break;
    case 'quick':
      quickSort();
      break;
  }
}

// Generate an initial set of bars on page load
generateBars();
