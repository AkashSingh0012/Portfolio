"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
import CodeBlock from '@/app/components/Code';
import FileExplorer from '@/app/components/fileexplorer';
function page() {
  return (
    <>
    <Navbar/>

    <div>
        <div className="ProjectDescription">
            <div className='Text'>
                <h2> Drag and Drop</h2>
                <h3> Overview </h3>
                <p>
                    The following Project was a assignment given to me to implement for a unity developer role.
                    The Assets were provided in the assignment, and was tasked to implement the drag drop the props on the scene to other table and 
                    have a ui which counted the props on the table.
                    
                </p>
                <h3> Core Features</h3>
                <ul>
                    <li> RayCast</li>
                    <li> UI </li>
                </ul>
                <h3> Key Learning</h3>
                <p> In this project i had my first interaction with the unity assignment and is one project introduced me to Unity's assignment workflow and the new Input System</p>


            </div>
            <div className="Image">
        <img src="/dragdrop.png"/>
    </div>
        </div>
    </div>

    <div className="ProjectDescription">
        <div className="Text">
            <h3> More about the Project</h3>
            <p>
                So during the task assignment i was working on unity project and specifically with new Input System of the unity.
                As such during the task i got i implemented all the features using unity new input system from drag and dropping item to Ui elements
                Below you can find the code i written for the projects.
            </p>
        </div> 
    </div>

    <div className="CodeSection">
        
<FileExplorer 
files= {[
    { filename: "DragDrop.cs",
      language: "C#",
    code:`using System.Collections;
using UnityEngine;

public class DragDrop : MonoBehaviour
{
    private PlayerControl playerControls;
    private Camera cam;
    private Rigidbody rb;

    private Vector2 screenPos;
    private bool isDragging = false;
    public bool IsDragging => isDragging;

    private void Awake()
    {
        cam = Camera.main;
        rb = GetComponent<Rigidbody>();
        playerControls = new PlayerControl();
    }

    private void OnEnable()
    {
        playerControls.Player.Enable();

        // Track screen position (mouse OR touch)
        playerControls.Player.ScrPosition.performed +=
            ctx => screenPos = ctx.ReadValue<Vector2>();

        // Press down
        playerControls.Player.Press.performed += _ =>
        {
            if (ClickedOnObject())
                StartCoroutine(Drag());
        };

        // Release
        playerControls.Player.Press.canceled += _ =>
        {
            isDragging = false;
        };
    }

    private void OnDisable()
    {
        playerControls.Player.Disable();
    }

 
    private bool ClickedOnObject()
    {
        Ray ray = cam.ScreenPointToRay(screenPos);
        if (Physics.Raycast(ray, out RaycastHit hit))
        {
            return (hit.transform == transform);
        }
        return false;
    }

    private Vector3 GetWorldPosition()
    {
        float z = cam.WorldToScreenPoint(transform.position).z;
        Vector3 sp = new Vector3(screenPos.x, screenPos.y, z);
        return cam.ScreenToWorldPoint(sp);
    }

    private IEnumerator Drag()
    {
        isDragging = true;
        rb.isKinematic = true;

        Vector3 offset = transform.position - GetWorldPosition();

        while (isDragging)
        {
            transform.position = GetWorldPosition() + offset;
            yield return null;
        }

        rb.isKinematic = false;
    }
}`}
    ,
    {filename:"CountProps.cs",
        language: "C#",
        code:`using UnityEngine;
using TMPro;
public class countProps : MonoBehaviour
{
    [Header("Tables")]
    [SerializeField] private Collider table1Collider;
    [SerializeField] private Collider table2Collider;

    [Header("Props")]
    [SerializeField] private Transform propsParent;
    [SerializeField] private TMP_Text Table;
    [SerializeField] private TMP_Text BOX;
    [Header("Raycast")]
    public float rayLength = 5f;
    public LayerMask tableMask;

    private DragDrop[] props;
    private int[] lastDragState; // 1 = dragging, 0 = released

    private void Start()
    {
        props = propsParent.GetComponentsInChildren<DragDrop>();
        lastDragState = new int[props.Length];

        // Initialize all drag states
        for (int i = 0; i < props.Length; i++)
            lastDragState[i] = props[i].IsDragging ? 1 : 0;
    }

    private void Update()
    {
        // Check if any prop has just stopped dragging
        for (int i = 0; i < props.Length; i++)
        {
            bool nowDragging = props[i].IsDragging;

            if (lastDragState[i] == 1 && nowDragging == true)
            {
                // Drag ended → update count once
                UpdateCounts();
            }

            lastDragState[i] = nowDragging ? 1 : 0;
        }
    }

    public void UpdateCounts()
    {
        int table1Count = 0;
        int table2Count = 0;

        foreach (Transform child in propsParent)
        {
            Vector3 origin = child.position;
            Vector3 dir = Vector3.down;

            if (Physics.Raycast(origin, dir, out RaycastHit hit, rayLength, tableMask))
            {
                if (hit.collider == table1Collider) table1Count++;
                if (hit.collider == table2Collider) table2Count++;
            }
        }

        Debug.Log($"TABLE1 = {table1Count} | TABLE2 = {table2Count}");
        Table.text = table1Count.ToString();
        BOX.text = table2Count.ToString();
        
    }
}`
    }
]}
/>


</div>
    
    </>
  )
}

export default page