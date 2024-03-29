"""Add UWCourse Model

Revision ID: b9e4b1660aa8
Revises: db89dd0b1d23
Create Date: 2023-07-15 18:18:02.432843

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9e4b1660aa8'
down_revision = 'db89dd0b1d23'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('uw_course',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('code', sa.String(length=20), nullable=True),
    sa.Column('terms', sa.String(length=120), nullable=True),
    sa.Column('description', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('uw_course')
    # ### end Alembic commands ###
